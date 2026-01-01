import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Balance Box",
  description: "Best Financial Management Web Application",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
