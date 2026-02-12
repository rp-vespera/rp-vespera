import "./scss/CustomerRegs.scss";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {children}
    </div>
  );
}