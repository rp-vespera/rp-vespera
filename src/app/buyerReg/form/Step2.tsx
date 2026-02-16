import { Button } from "primereact/button";

interface Step2Props {
  form: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  sendOTP: () => void;
  verifyOTP: () => Promise<void>;
  otpTimer: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Step2({
  form,
  handleChange,
  sendOTP,
  verifyOTP,
  otpTimer,
  loading,
  setLoading,
}: Step2Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        OTP Verification
      </h2>

      <input
        type="text"
        name="otp"
        value={form.otp}
        onChange={handleChange}
        placeholder="Enter OTP"
        className="bg-white w-full rounded-lg px-3 py-2"
      />

      <div className="flex flex-row gap-2">
        <Button
          type="button"
          className="bgAccent text-white w-1/2 justify-center !text-[12px]"
          onClick={sendOTP}
          disabled={otpTimer > 0}
        >
          {otpTimer > 0
            ? `${Math.floor(otpTimer / 60)}:${String(
                otpTimer % 60
              ).padStart(2, "0")}`
            : "Resend OTP"}
        </Button>

        <Button
          icon="pi pi-check"
          loading={loading}
          className="btn-primary text-white w-1/2 justify-center !text-[12px]"
          onClick={async () => {
            setLoading(true);
            try {
              await verifyOTP();
            } finally {
              setLoading(false);
            }
          }}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
}
