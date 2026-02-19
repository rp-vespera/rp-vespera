export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
        <div className="flex flex-row page-content">
            <div className="page-content bg-black/50 bg-[url(/hero.jpg)] bg-blend-multiply bg-cover bg-center">
            </div>
            <div className="page-content bg-primary flex flex-col justify-center items-center">
                <img src="/logo.png" alt="" className="w-1/2" />
                {children}
            </div>
        </div>
    </div>
  );
}
