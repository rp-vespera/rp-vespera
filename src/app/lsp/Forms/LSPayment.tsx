'use client';

interface Props {
  nextPage: () => void;
}

export default function LSPayment({ nextPage }: Props) {
  return (
    <div>
        <header>LSP Information</header>

        <button onClick={nextPage}>
            Submit Changes
        </button>
    </div>
  );
}
