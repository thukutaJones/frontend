import type { Metadata } from "next";
import TopBar from "@/components/root/TopBar";

export const metadata: Metadata = {
  title: "Departments | Wez Medical Centre",
  description: "",
};

export default function DepartmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-sans text-gray-900 antialiased">
      {children}
    </main>
  );
}
