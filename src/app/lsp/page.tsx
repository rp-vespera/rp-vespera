'use client';

import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import OTPConfirmation from "./Forms/OTPConfirmation";
import LSPayment from "./Forms/LSPayment";
import IntermentPayment from "./Forms/IntermentPayment";
import PaymentSelection from "./Forms/paymentSelection";
import CustomerInformation from "./Forms/CustomerInformation";
import ConfirmationPage from "./Forms/Confirmation";

export default function Form() {
  const toast = useRef<Toast>(null);
  const [currentForm, setCurrentForm] = useState<number>(0);
  const [paymentForm, setPaymentForm] = useState<string>("");
  
  useEffect(() => {
    const stored = sessionStorage.getItem("CurrentForm");
    if(stored){
      setCurrentForm(Number(stored));
    }else{
      sessionStorage.setItem("CurrentForm", "0");
    }
  }, []);

  const changeForm = (step: number, payment?: string) => {
    if (payment) {
      setPaymentForm(payment);
      sessionStorage.setItem("PaymentOption", payment);
    }

    setCurrentForm(step);
    sessionStorage.setItem("CurrentForm", step.toString());
  };
  return (
    <div className="w-full flex flex-row justify-center">
      <div className="w-4/5 p-10 bg-secondary rounded-2xl">
        {currentForm === 0 && (
          <CustomerInformation nextPage={() => changeForm(1)} />
        )}
        {currentForm === 1 && (
          <OTPConfirmation nextPage={() => changeForm(2)} />
        )}
        {currentForm === 2 && (
          <PaymentSelection
            nextPage={(paymentType) => changeForm(3, paymentType)}
          />
        )}
        {currentForm === 3 && paymentForm === "LSP" && (
          <LSPayment nextPage={() => changeForm(4)} />
        )}

        {currentForm === 3 && paymentForm === "IP" && (
          <IntermentPayment nextPage={() => changeForm(4)} />
        )}
        {currentForm === 4 && (
          <ConfirmationPage />
        )}
      </div>

    </div>
  );
}