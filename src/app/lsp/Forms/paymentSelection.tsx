interface Props {
  nextPage: (paymentType: string) => void;
}

export default function PaymentSelection({ nextPage }: Props) {
  return (
    <div className="flex flex-row items-center justify-around gap-5 mt-4">
      <button
        className="bg-accent text-white h-20 w-[90%]"
        onClick={() => nextPage("IP")}
      >
        Interment Payment
      </button>

      <button
        className="bg-accent text-white h-20 w-[90%]"
        onClick={() => nextPage("LSP")}
      >
        Lot Sales Payment
      </button>
    </div>
  );
}
