"use client";

import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useRegister } from "../ts/buyerReg";

export default function CustomerReg() {
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
    loadingProvinces,
    loadingCities,
    loadingBarangays,
    handleChange,
    sendOTP,
    verifyOTP,
    nextStep,
    nextStep3,
    backstep2,
    backstep,
    verifyID,
    setPreview,
    preview,
    verifyCard,
    nextStep5,
  } = useRegister(showToast);

  return (
    <>
      <Toast ref={toast} className="toasts" />
      {/* <div className="flex flex-col h-screen items-center justify-center px-4 bgPrimary min-w-[50%] forms"> */}
      <div className="w-full max-w-xl px-6 py-10 forms">
        <a
          href=""
          className="absolute top-4 right-4 bg-accent text-white px-4 py-3 rounded-full shadow hover:bg-green-700 transition flex items-center justify-center"
        >
          <i className="fa-solid fa-chevron-left text-white text-lg"></i>
        </a>

        <img
          src="/assets/images/logo-hero.png"
          alt="Logo"
          className="w-[50%] h-auto mb-4 justify-self-center"
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
                  Basic Information
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
            {step === 2 && (
              <div className="step2-form space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Additional Information
                </h2>
                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender<span className="text-red-700">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm py-1 px-2"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Birth Date */}
                <div>
                  <label
                    htmlFor="birthDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birth Date<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  />
                </div>

                {/* Birth Place */}
                <div>
                  <label
                    htmlFor="birthPlace"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birth Place<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="birthPlace"
                    name="birthPlace"
                    value={form.birthPlace}
                    onChange={handleChange}
                    className="py-1 px-2 bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    placeholder="City, Province, Country"
                  />
                </div>

                {/* Civil Status */}
                <div>
                  <label
                    htmlFor="civilStatus"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Civil Status<span className="text-red-700">*</span>
                  </label>
                  <select
                    id="civilStatus"
                    name="civilStatus"
                    value={form.civilStatus}
                    onChange={handleChange}
                    className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                {/* Nationality */}
                <div>
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nationality<span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={form.nationality}
                    onChange={handleChange}
                    className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    placeholder="e.g., Filipino"
                  />
                </div>

                {/* Type of Payor */}
                <div>
                  <label
                    htmlFor="typeOfPayor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type of Payor<span className="text-red-700">*</span>
                  </label>
                  <select
                    id="typeOfPayor"
                    name="typeOfPayor"
                    value={form.typeOfPayor}
                    onChange={handleChange}
                    className="bg-white py-1 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  >
                    <option value="">Select Type</option>
                    <option value="Company">Company</option>
                    <option value="Individual">Individual</option>
                  </select>
                </div>
                <Button
                  className="w-1/2 align-items-center justify-center text-white rounded-lg"
                  icon="pi pi-check"
                  loading={loading}
                  onClick={nextStep}
                >
                  Next
                </Button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2.1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Address Information
                </h3>
                {/* Province */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Province <span className="text-red-700">*</span>
                  </label>
                  <select
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    className="bg-white w-full rounded-lg px-3 py-2"
                    disabled={loadingProvinces}
                  >
                    <option value="">
                      {loadingProvinces
                        ? "Loading provinces..."
                        : "Select Province"}
                    </option>
                    {provinces.map((prov) => (
                      <option key={prov.code} value={prov.code}>
                        {prov.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-700">*</span>
                  </label>
                  <select
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    disabled={!form.province || loadingCities}
                    className="bg-white w-full rounded-lg px-3 py-2"
                  >
                    <option value="">
                      {loadingCities ? "Loading cities..." : "Select City"}
                    </option>
                    {cities.map((city) => (
                      <option key={city.code} value={city.code}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Barangay */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Barangay <span className="text-red-700">*</span>
                  </label>
                  <select
                    name="barangay"
                    value={form.barangay}
                    onChange={handleChange}
                    disabled={!form.city || loadingBarangays}
                    className="bg-white w-full rounded-lg px-3 py-2"
                  >
                    <option value="">
                      {loadingBarangays
                        ? "Loading barangays..."
                        : "Select Barangay"}
                    </option>
                    {barangays.map((brgy) => (
                      <option key={brgy.code} value={brgy.code}>
                        {brgy.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="gap-2 flex ">
                  <Button
                    className="w-1/2 bg-accent !border-none align-items-center justify-center text-white rounded-lg"
                    loading={loading}
                    onClick={backstep}
                  >
                    Back
                  </Button>
                  <Button
                    className="w-1/2  btn-primary align-items-center justify-center text-white rounded-lg"
                    loading={loading}
                    onClick={nextStep3}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div id="step3" className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Upload Government ID
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  Upload any valid government ID (front only is enough to
                  start).
                </p>

                <div>
                  {/* ID Upload */}
                  <label className="block text-sm font-medium text-gray-700">
                    ID Upload <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="govId"
                    name="govId"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleChange}
                    className="bg-white mt-1 w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-3 py-2"
                  />

                  {preview && (
                    <img
                      src={preview}
                      alt="ID Preview"
                      className="w-full h-40 object-cover rounded-lg border mt-2"
                    />
                  )}

                  {form.govId && !preview && (
                    <p className="mt-2">{form.govId.name}</p>
                  )}

                  {/* File instructions */}
                  <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg space-y-1 mt-2">
                    <p>✔ Accepted file types: JPG, PNG, PDF</p>
                    <p>✔ Max file size: 5MB</p>
                    <p>✔ Ensure the image is clear and readable</p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={backstep2}
                      className="w-1/2 py-2 bg-accent text-white rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      id="verifyBtn"
                      onClick={verifyCard}
                      className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
                      disabled={!form.govId}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <div id="step2" className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Email & Password
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    required
                    className="bg-white mt-1 w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-3 py-2"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      className="bg-white mt-1 w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-3 py-2"
                      placeholder="Enter password"
                    />
                    <p className="text-xs text-gray-700 mt-1">
                      At least 8 characters.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password_confirmation"
                      required
                      className="bg-white mt-1 w-full rounded-lg border-gray-300 focus:ring-green-500 focus:border-green-500 px-3 py-2"
                      placeholder="Re-enter password"
                    />
                  </div>
                  <div className="gap-2 flex">
                    <button
                      className="bg-accent text-white w-1/2"
                      onClick={nextStep3}
                    >
                      Back
                    </button>
                    <button
                      className="btn-primary w-1/2 !bgAccent"
                      onClick={nextStep5}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
            {step === 5 && (
              <div id="step4" className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Step 4: Review & Upload Government ID
                </h2>
                <p className="text-xs text-gray-500">
                  Please review your information before saving.
                </p>

                <div className="bg-gray-50 border rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Full Name</span>
                    <span
                      id="fullName"
                      className="font-medium text-gray-700"
                    ></span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone</span>
                    <span
                      id="phone"
                      className="font-medium text-gray-700"
                    ></span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span
                      id="address"
                      className="font-medium text-gray-700 text-right"
                    ></span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">ID Type Detected</span>
                    <span
                      id="idType"
                      className="font-medium text-gray-700"
                    ></span>
                  </div>

                  <div className="mt-2">
                    <img
                      id="idPreview"
                      src=""
                      alt="Uploaded Government ID"
                      className="w-48 h-auto rounded-lg border border-gray-300"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="button"
                    onClick={backstep2}
                    className="w-1/2 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
