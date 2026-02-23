export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page !h-dvh">
        <div className="flex flex-row page-content !h-full">
            <div className="page-content bg-black/50 bg-[url(/hero.jpg)] bg-blend-multiply bg-cover bg-center hidden lg:block">
            </div>
            <div className="page-content bg-primary flex flex-col justify-center items-center py-5">
                <img src="/logo.png" alt="" className="w-1/2" />
                {children}
            </div>
        </div>
    </div>
  );
}
