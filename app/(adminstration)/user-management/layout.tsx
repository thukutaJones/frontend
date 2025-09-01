import type { Metadata } from "next";
import TopBar from "@/components/root/TopBar";

export const metadata: Metadata = {
  title: "User Mng | Wez Medical Centre",
  description: "",
};

export default function UserMngLayout({
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
