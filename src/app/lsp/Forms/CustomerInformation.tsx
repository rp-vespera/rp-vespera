'use client';
import { User } from "lucide-react";
interface Props {
  nextPage: () => void;
}

export default function CustomerInformation({ nextPage }: Props) {
  return (
    <div className="Customerinformation">
      <header className="font-raleway font-semibold text-4xl text-center">Customer Verification</header>
        <form className="flex flex-col gap-3 mt-4">
            <div>
                <label className="text-white">First Name</label>
                <div className="input-text-container bg-white">
                    <User/>
                    <input type="text" name="" id="" className="input-field" placeholder="First Name" />
                </div>
            </div>
            <div>
                <label className="text-white">Middle Name</label>
                <div className="input-text-container bg-white">
                    <User/>
                    <input type="text" name="" id="" className="input-field" placeholder="Middle Name" />
                </div>
            </div>
            <div>
                <label className="text-white">Last Name</label>
                <div className="input-text-container bg-white">
                    <User/>
                    <input type="text" name="" id="" className="input-field" placeholder="Last Name" />
                </div>
            </div>
        </form>
        <button onClick={nextPage} className="!p-4 bg-accent text-white w-full mt-8">
            Submit Changes
        </button>
    </div>
  );
}
