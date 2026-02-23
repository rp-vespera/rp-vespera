'use client';

import { useEffect, useState } from "react";
import { PhilippinePeso } from "lucide-react";
import { PaymentService } from "@/Domain/LSP/Services/PaymentService";
import imageCompression from "browser-image-compression";
import { SubmitPaymentDTO } from "@/Domain/LSP/DTO/SubmitPaymentDTO";

interface Props {
  nextPage: () => void;
}

interface LotItem {
  bpar_i_person_id: number;
  mp_i_owner_id: number;
  mp_i_lot_id: number;
  amt_amort: string;
  amt_spotcash: string;
  lot: string;
  date_sched_payment: string;
}

export default function LSPayment({ nextPage }: Props) {
  const [lots, setLots] = useState<LotItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [allocationType, setAllocationType] =
    useState<"equal" | "allocate">("equal");

  const [allocations, setAllocations] =
    useState<Record<string, number>>({});

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [aiReading, setAiReading] = useState(false);

  // ---------------- FETCH LOTS ----------------
  useEffect(() => {
    const stored = sessionStorage.getItem("verifiedCustomer");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const bparId = parsed?.data?.bpar_i_person_id;
    if (!bparId) return;

    const fetchLots = async () => {
      try {
        setLoading(true);
        const result = await PaymentService.getOwnerLots(
          String(bparId)
        );
        if (result.success) {
          setLots(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLots();
  }, []);

  // ---------------- AI RECEIPT ----------------
  const handleReadReceipt = async (file: File) => {
    try {
      setAiReading(true);

      const formData = new FormData();
      formData.append("receipt", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/read-receipt`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to process receipt");
      }

      if (result.success) {
        setReferenceNumber(result.referenceNumber || "");
        setPaymentAmount(Number(result.amount) || 0);
      } else {
        alert(result.error || "AI extraction failed");
      }

    } catch (error: any) {
      console.error("Receipt AI Error:", error);
      alert(error.message);
    } finally {
      setAiReading(false);
    }
  };

  const handleFileChange = async (file: File) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });

      setReceiptFile(compressedFile);
      await handleReadReceipt(compressedFile);

    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  // ---------------- SPLIT EQUALLY ----------------
  useEffect(() => {
    if (
      allocationType === "equal" &&
      lots.length > 0 &&
      paymentAmount > 0
    ) {
      const baseShare =
        Math.floor((paymentAmount / lots.length) * 100) / 100;

      const newAllocations: Record<string, number> = {};
      let distributedTotal = 0;

      lots.forEach((lot, index) => {
        const key = `${lot.mp_i_lot_id}-${lot.date_sched_payment}-${index}`;

        if (index === lots.length - 1) {
          newAllocations[key] = parseFloat(
            (paymentAmount - distributedTotal).toFixed(2)
          );
        } else {
          newAllocations[key] = baseShare;
          distributedTotal += baseShare;
        }
      });

      setAllocations(newAllocations);
    }
  }, [paymentAmount, allocationType, lots]);
  useEffect(() => {
    if (allocationType === "allocate") {
      setAllocations({});
    }
  }, [allocationType]);

  const handleManualAllocation = (key: string, value: number) => {
    if (value < 0) value = 0;

    value = parseFloat(value.toFixed(2));

    const otherTotal = Object.entries(allocations)
      .filter(([k]) => k !== key)
      .reduce((sum, [, val]) => sum + (val || 0), 0);

    const maxAllowed = paymentAmount - otherTotal;
    const safeValue = value > maxAllowed ? maxAllowed : value;

    setAllocations((prev) => ({
      ...prev,
      [key]: safeValue,
    }));
  };

  const totalAllocated = Object.values(allocations).reduce(
    (sum, value) => sum + (value || 0),
    0
  );

  const remainingBalance = paymentAmount - totalAllocated;

  const isValid =
    paymentAmount > 0 &&
    remainingBalance === 0 &&
    lots.length > 0 &&
    referenceNumber.length > 0;

  const generateAllocationDescription = () => {
    return lots
      .map((lot, index) => {
        const key = `${lot.mp_i_lot_id}-${lot.date_sched_payment}-${index}`;
        const amount = allocations[key] ?? 0;

        return `${lot.lot}/${amount}`;
      })
      .join(",");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!receiptFile) {
        alert("Please upload receipt.");
        return;
      }

      if (lots.length === 0) {
        alert("No lots found.");
        return;
      }

      const ownerId = Number(lots[0].mp_i_owner_id);
      const purchaserId = Number((lots[0] as any).mp_t_purchagr_id);

      const stored = sessionStorage.getItem("verifiedCustomer");
      const parsed = stored ? JSON.parse(stored) : null;
      const phoneNumber = parsed?.data?.phone;

      if (!phoneNumber || !ownerId || !purchaserId) {
        alert("Missing required customer data.");
        return;
      }

      const formattedLots = lots
        .map((lot, index) => {
          const key = `${lot.mp_i_lot_id}-${lot.date_sched_payment}-${index}`;
          const amount = allocations[key] || 0;

          if (amount <= 0) return null;

          return {
            mp_i_lot_id: lot.mp_i_lot_id,
            amount: Number(amount),
            lot_number: lot.lot,
          };
        })
        .filter(
          (lot): lot is { mp_i_lot_id: number; amount: number; lot_number: string } => !!lot
        );

      if (formattedLots.length === 0) {
        alert("No allocated lots.");
        return;
      }

      const description =
        allocationType === "allocate"
          ? generateAllocationDescription()
          : undefined;

      const dto: SubmitPaymentDTO = {
        phone_number: phoneNumber,
        mp_i_owner_id: ownerId,
        mp_t_purchagr_id: purchaserId,
        reference_number: referenceNumber,
        cnc_sales_incharge: "WEB",
        attachment: receiptFile,
        lots: formattedLots,
        description,
        notes,
      };

      // 🔥 MERGE IMPLEMENTATION HERE
      const isMergedMode = allocationType === "allocate";

      const result = await PaymentService.submitPayment(dto, isMergedMode);

      if (result.success) {
        alert("Payment submitted successfully!");
        nextPage();
      } else {
        alert(result.message || "Submission failed.");
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="font-semibold text-white text-xl">
        Lot Information
      </header>
      <table className="w-full border-collapse">
        <thead className="bg-white border-b-1">
          <tr>
            <th className="py-2 px-1 rounded-tl-lg">Lot</th>
            <th className="py-2 px-1 text-center">Amortization</th>
            <th className="py-2 px-1 rounded-tr-lg text-center">
              Spot Cash
            </th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            lots.map((lot, index) => {
              const rowKey = `${lot.mp_i_lot_id}-${lot.date_sched_payment}-${index}`;
              return (
                <tr key={rowKey}>
                  <td className="py-1 px-1 pl-5">{lot.lot}</td>
                  <td className="py-1 px-1 text-center">
                    ₱ {lot.amt_amort}
                  </td>
                  <td className="py-1 px-1 text-center">
                    ₱ {lot.amt_spotcash}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      
      <div className="my-4 bg-white p-4 rounded-xl space-y-3">
        <label className="font-semibold block">
          Upload Receipt
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            handleFileChange(file);
          }}
        />
        {aiReading && (
          <div className="text-blue-500">
            Reading receipt using AI...
          </div>
        )}
      </div>

      <div className="my-4 bg-white p-4 rounded-xl">
        <div className="flex flex-row justify-between items-start my-3">
          <label className="font-semibold block mb-2">
            Allocation Type
          </label>
          <div className="text-right flex flex-col">
            <label>Reference Number</label>
            <input type="text" className="w-full outline-none !text-right" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} placeholder="Auto-filled from receipt"/>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setAllocationType("equal")}
            className={`px-4 py-2 rounded-lg ${
              allocationType === "equal"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Split Equally
          </button>

          <button
            type="button"
            onClick={() => setAllocationType("allocate")}
            className={`px-4 py-2 rounded-lg ${
              allocationType === "allocate"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Manual Allocation
          </button>
        </div>
      </div>
      {lots.length > 0 && paymentAmount > 0 && (
        <div className="my-4 bg-white p-4 rounded-xl">
          <h3 className="font-semibold mb-3">
            Payment Allocation
          </h3>
          <div className="my-4">
            <div className="flex flex-row gap-3 items-center">
              <label>Amount: </label>
              <div className="w-full input-text-container border-gray-900 border !rounded-md !p-1">
                <PhilippinePeso />
                <input
                  type="number"
                  className="input-field"
                  placeholder="Enter Payment Amount"
                  value={paymentAmount || ""}
                  onChange={(e) =>
                    setPaymentAmount(parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </div>
          <table className="w-full border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-2 text-left">Lot</th>
                {lots.map((lot, index) => (
                  <th key={index} className="py-2 px-2 text-center">
                    {lot.lot}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-2 px-2 font-semibold !text-sm">
                  Allocated Amount
                </td>

                {lots.map((lot, index) => {
                  const key = `${lot.mp_i_lot_id}-${lot.date_sched_payment}-${index}`;

                  return (
                    <td key={key} className="text-center py-2 px-2">
                      <input
                        type="number"
                        className="border rounded p-1 w-14 text-center"
                        value={allocations[key] || ""}
                        disabled={allocationType === "equal"}
                        onChange={(e) =>
                          handleManualAllocation(
                            key,
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <div className="mt-4 text-sm space-y-1 flex flex-row justify-between items-center">
            <div className="m-[unset]">Total Allocated: ₱ {totalAllocated.toFixed(2)}</div>
            <div
              className={`${
                remainingBalance !== 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              Remaining Balance: ₱ {remainingBalance.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      <div className="my-4 bg-white p-4 rounded-xl">
        <label className="font-semibold block mb-2">
          Notes
        </label>
        <textarea
          className="border p-2 rounded w-full"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes (optional)"
        />
      </div>
      <button
        disabled={!isValid || loading}
        onClick={handleSubmit}
        className="btn-primary w-full bg-accent !p-4 mt-4 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Payment"}
      </button>
    </div>
  );
}
