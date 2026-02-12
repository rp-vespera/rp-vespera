'use client';

interface Props {
  nextPage: () => void;
}

export default function IntermentPayment({ nextPage }: Props) {
  return (
    <div>
        <header>Interment Information</header>

        <button onClick={nextPage}>
            Submit Changes
        </button>
    </div>
  );
}
