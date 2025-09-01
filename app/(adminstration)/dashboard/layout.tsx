import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Wez Medical Centre",
  description: "",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-sans text-gray-900 antialiased h-screen overflow-auto scroll-container">
      {children}
    </main>
  );
}
