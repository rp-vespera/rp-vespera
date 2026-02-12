import Form from "./Form";
import CustomerReg from "./CustomerReg";

export default function RegisterPage() {
  return (
    <>
      {/* Left Side - Form */}
      <CustomerReg />

      {/* Right Side - Image (hidden on mobile) */}
      <div className="flex items-center justify-center bgPrimary">
        <Form />
      </div>
    </>
  );
}
