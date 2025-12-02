import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh max-w-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto px-2">{children}</main>
      <Footer />
    </div>
  );
}
