import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Balance Box",
  description: "Best Financial Management Web Application",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
