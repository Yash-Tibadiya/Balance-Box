import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <Footer />
    </>
  );
}
