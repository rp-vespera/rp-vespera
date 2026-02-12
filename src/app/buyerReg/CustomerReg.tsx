import Image from "next/image";

export default function CustomerReg() {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      <Image
        src="/assets/images/learn_more_2_3.jpg"
        alt="Background"
        fill
        priority
        className="object-cover scale-105 brightness-75 blur-[2px]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 px-6">
        <h1 className="w-2/3 text-center font-serif text-3xl leading-snug text-white drop-shadow-xl md:text-4xl lg:text-5xl">
          Being informed is a quiet strength, thank you for staying mindful of
          your account.
        </h1>
      </div>
    </div>
  );
}
