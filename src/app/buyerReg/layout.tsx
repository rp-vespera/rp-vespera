import "./scss/CustomerRegs.scss";
import "../globals.scss";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="hidden lg:block relative overflow-hidden">
            <img src="/assets/images/learn_more_2_3.jpg"
                className="absolute inset-0 w-full h-full object-cover brightness-85 blur-[2px] scale-105" />

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="absolute inset-0 flex items-center justify-center px-6">
                <h1
                    className="w-1/2 text-center text-white font-playfair
                   text-3xl md:text-4xl lg:text-5xl
                   leading-snug drop-shadow-xl
                   animate-fade-up">
                    “Being informed is a quiet strength, thank you for staying mindful of your account.”
                </h1>
            </div>
        </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="flex items-center justify-center bgPrimary">
        {children}
      </div>
    </div>
  );
}
