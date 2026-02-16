interface Step1Props {
  form: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  nextStep: () => void;
  sendOTP: () => void;
  otpTimer: number;
}
import { Button } from "primereact/button";
export default function Step1({
  form,
  handleChange,
  sendOTP,
  otpTimer,
}: Step1Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>

      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="bg-white w-full rounded-lg px-3 py-2"
      />

      <input
        type="text"
        name="middleName"
        value={form.middleName}
        onChange={handleChange}
        placeholder="Middle Name"
        className="bg-white w-full rounded-lg px-3 py-2"
      />

      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="bg-white w-full rounded-lg px-3 py-2"
      />

      <input
        type="text"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        className="bg-white w-full rounded-lg px-3 py-2"
      />

      <Button type="button" onClick={sendOTP} disabled={otpTimer > 0}>
        {otpTimer > 0
          ? `Resend in ${Math.floor(otpTimer / 60)}:${String(
              otpTimer % 60,
            ).padStart(2, "0")}`
          : "Send OTP"}
      </Button>
    </div>
  );
}
