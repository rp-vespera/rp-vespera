'use client';

import { useState } from "react";
import { User } from "lucide-react";
import { PaymentService } from "@/Domain/LSP/Services/PaymentService";

interface Props {
  nextPage: () => void;
}

export default function CustomerInformation({ nextPage }: Props) {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await PaymentService.verifyName({
        firstname,
        middlename: middlename || null,
        lastname,
      });

      // ✅ Store entire result in localStorage
      localStorage.setItem(
        "verifiedCustomer",
        JSON.stringify(result)
      );

      nextPage();
    } catch (error) {
      console.error(error);
      alert("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Customerinformation">
      <header className="font-raleway font-semibold text-4xl text-center">
        Customer Verification
      </header>

      <form className="flex flex-col gap-3 mt-4">
        <div>
          <label className="text-white">First Name</label>
          <div className="input-text-container bg-white">
            <User />
            <input
              type="text"
              className="input-field"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-white">Middle Name</label>
          <div className="input-text-container bg-white">
            <User />
            <input
              type="text"
              className="input-field"
              placeholder="Middle Name"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-white">Last Name</label>
          <div className="input-text-container bg-white">
            <User />
            <input
              type="text"
              className="input-field"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
        </div>
      </form>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="!p-4 bg-accent text-white w-full mt-8 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Submit Changes"}
      </button>
    </div>
  );
}
