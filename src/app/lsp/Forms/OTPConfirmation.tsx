'use client';

import { useEffect, useState } from "react";
import { PaymentService } from "@/Domain/LSP/Services/PaymentService";

interface Props {
  nextPage: () => void;
}

interface VerifiedCustomerResponse {
  type: string;
  data: {
    name1: string;
    phone: string;
    bpar_i_person_id: number;
    mp_i_owner_id: number;
  };
}

export default function OTPConfirmation({ nextPage }: Props) {
  const [displayOTPField, setDisplayOTPField] = useState(false);
  const [otp, setOtp] = useState("");
  const [customer, setCustomer] =
    useState<VerifiedCustomerResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidOTP = otp.length === 6;

  useEffect(() => {
    const stored = localStorage.getItem("verifiedCustomer");
    if (stored) {
      const parsed: VerifiedCustomerResponse = JSON.parse(stored);
      setCustomer(parsed.data);
    }
  }, []);

  // ✅ STEP 1: SEND OTP
  const handleSendOtp = async () => {
    if (!customer) return;

    try {
      setLoading(true);

      const result = await PaymentService.sendOtp({
        phone: customer.phone,
        name1: customer.name1,
        bpar: String(customer.bpar_i_person_id),
        owner: String(customer.mp_i_owner_id),
      });

      if (result.success && result.type === "otp_sent") {
        setDisplayOTPField(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 2: VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!customer) return;

    try {
      setLoading(true);

      await PaymentService.checkOtp({
        name1: customer.name1,
        bpar: String(customer.bpar_i_person_id),
        owner: String(customer.mp_i_owner_id),
        otp: otp,
        phone: customer.phone,
      });

      nextPage();
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="text-center font-raleway text-3xl !font-semibold text-white">
        Is this your Information?
      </header>

      <div className="text-center text-white text-xl flex flex-col gap-2 mt-4">
        <span>
          Name: <span className="font-semibold">{customer?.name1}</span>
        </span>
        <span>
          Contact Number:{" "}
          <span className="font-semibold">{customer?.phone}</span>
        </span>
      </div>

      <div className="bg-primary p-8 rounded-2xl mt-5 w-full flex flex-col text-center">
        {!displayOTPField && (
          <>
            <span className="font-semibold">
              Send One-Time Password (OTP)
            </span>

            <div className="flex flex-row gap-3 justify-center mt-4">
              <button
                type="button"
                className="btn-primary"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Yes, it's me"}
              </button>

              <button className="btn-danger">
                No
              </button>
            </div>
          </>
        )}

        {displayOTPField && (
          <>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
                maxLength={6}
                inputMode="numeric"
                className="input-field border text-center p-4 rounded-xl border-gray-600"
              />
            </div>

            <button
              className="btn-primary !p-4 mt-6"
              onClick={handleVerifyOtp}
              disabled={!isValidOTP || loading}
            >
              {loading ? "Verifying..." : "Confirm OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
