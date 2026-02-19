'use client';

import { useEffect, useState } from "react";
import { PhilippinePeso } from "lucide-react";
import { PaymentService } from "@/Domain/LSP/Services/PaymentService";
import imageCompression from "browser-image-compression";

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
    const stored = localStorage.getItem("verifiedCustomer");
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

  // ---------------- UI ----------------
  return (
    <div>
      <header className="font-semibold text-white text-xl mb-2">
        Lot Information
      </header>

      {/* TABLE */}
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

      {/* PAYMENT INPUT */}
      <div className="my-4">
        <div className="input-text-container border-gray-900 border !rounded-xl !p-3">
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

      {/* RECEIPT UPLOAD */}
      <div className="my-4 bg-white p-4 rounded-xl space-y-3">
        <label className="font-semibold block">
          Upload Receipt (AI Auto Read)
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

        {receiptFile && (
          <img
            src={URL.createObjectURL(receiptFile)}
            className="w-40 rounded-lg border"
            alt="Receipt Preview"
          />
        )}

        {aiReading && (
          <div className="text-blue-500">
            Reading receipt using AI...
          </div>
        )}
      </div>

      {/* REFERENCE FIELD */}
      <div className="my-4 bg-white p-4 rounded-xl">
        <label className="font-semibold block mb-2">
          Reference Number
        </label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
          placeholder="Auto-filled from receipt"
        />
      </div>

      {/* SUBMIT */}
      <button
        disabled={!isValid}
        onClick={nextPage}
        className="btn-primary w-full bg-accent !p-4 mt-4 disabled:opacity-50"
      >
        Submit Changes
      </button>
    </div>
  );
}
