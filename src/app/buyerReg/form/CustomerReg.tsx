"use client";

import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useRegister } from "../ts/buyerReg";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

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
              <Step1
                form={form} 
                handleChange={handleChange}
                nextStep={nextStep}
                sendOTP={sendOTP}
                otpTimer={otpTimer}
              />
            )}
            {/* STEP 1.1 OTP */}
            {step === 1.1 && (
              <Step2
                form={form}
                handleChange={handleChange}
                sendOTP={sendOTP}
                verifyOTP={verifyOTP}
                otpTimer={otpTimer}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {step === 2 && (
              <Step3
                form={form}
                handleChange={handleChange}
                nextStep={nextStep}
                loading={loading}
              />
            )}

            {/* STEP 2 */}
            {step === 2.1 && (
              <Step4
                form={form}
                handleChange={handleChange}
                provinces={provinces}
                cities={cities}
                barangays={barangays}
                loadingProvinces={loadingProvinces}
                loadingCities={loadingCities}
                loadingBarangays={loadingBarangays}
                loading={loading}
                backstep={backstep}
                nextStep3={nextStep3}
              />
            )}
            {step === 3 && (
              <Step5
                form={form}
                preview={preview}
                handleChange={handleChange}
                backstep2={backstep2}
                verifyCard={verifyCard}
              />
            )}
            {step === 4 && (
              <Step6
                form={form}
                handleChange={handleChange}
                nextStep5={nextStep5}
                nextStep3={backstep2}
                loading={loading}
              />
            )}
            {step === 5 && (
              <Step7
                form={form}
                backstep2={backstep2}
                onSubmit={() => {
                  // Handle final submission
                  console.log("Submitting:", form);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
