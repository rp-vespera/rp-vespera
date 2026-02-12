'use client';

interface Props {
  nextPage: () => void;
}

export default function OTPConfirmation({ nextPage }: Props) {
  return (
    <div>
      <header>OTP Information</header>

      <button onClick={nextPage}>
        Submit Changes
      </button>
    </div>
  );
}
