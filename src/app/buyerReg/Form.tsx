"use client";

import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useRegister } from "./js/buyerReg"; // adjust path

export default function Form() {
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (options: any) => {
    toast.current?.show({ ...options, life: 700 });
  };

  const {
    step,
    form,
    otpTimer,
    provinces,
    cities,
    barangays,
    handleChange,
    sendOTP,
    verifyOTP,
  } = useRegister(showToast);

  return (
    <>
      <Toast ref={toast} className="toasts" />
      <div className="flex flex-col h-screen items-center justify-center px-4 bgPrimary min-w-[50%] forms">
        <a
          href=""
          className="absolute top-4 right-4 bg-accent text-white px-4 py-3 rounded-full shadow hover:bg-green-700 transition flex items-center justify-center"
        >
          <i className="fa-solid fa-chevron-left text-white text-lg"></i>
        </a>

        <img
          src="/assets/images//logo-hero.png"
          alt="Logo"
          className="w-[50%] h-auto mb-4"
        ></img>
        <div className="flex h-[85vh] w-full flex-col rounded-2xl shadow-xl bgSecondary forms">
          <div className="border-b px-8 pb-4 pt-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Buyer Registration
            </h2>
            <p className="text-sm text-gray-500">Complete your registration</p>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Step 1: Basic Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="bg-white w-full rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={form.middleName}
                    onChange={handleChange}
                    placeholder="Middle Name"
                    className="bg-white w-full rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="bg-white w-full rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="09xxxxxxxxx"
                    className="bg-white w-full rounded-lg px-3 py-2"
                  />

                  <Button
                    type="button"
                    className="bgAccent text-white w-full justify-center"
                    onClick={sendOTP}
                    disabled={otpTimer > 0}
                  >
                    {otpTimer > 0
                      ? `Resend in ${Math.floor(otpTimer / 60)}:${otpTimer % 60}`
                      : "Send OTP"}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 1.1 OTP */}
            {step === 1.1 && (
              <>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="bg-white w-full rounded-lg px-3 py-2"
                />

                <Button
                  icon="pi pi-check"
                  loading={loading}
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
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Step 2: Address Information
                </h3>

                <input
                  type="text"
                  name="street_address"
                  value={form.street_address}
                  onChange={handleChange}
                  placeholder="Street, House No, Unit"
                  className="bg-white w-full rounded-lg px-3 py-2"
                />

                {/* Province */}
                <select
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="bg-white w-full rounded-lg px-3 py-2"
                >
                  <option value="">Select Province</option>
                  {provinces.map((prov) => (
                    <option key={prov.code} value={prov.code}>
                      {prov.name}
                    </option>
                  ))}
                </select>

                {/* City */}
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled={!form.province}
                  className="bg-white w-full rounded-lg px-3 py-2"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
                </select>

                {/* Barangay */}
                <select
                  name="barangay"
                  value={form.barangay}
                  onChange={handleChange}
                  disabled={!form.city}
                  className="bg-white w-full rounded-lg px-3 py-2"
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((brgy) => (
                    <option key={brgy.code} value={brgy.code}>
                      {brgy.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
