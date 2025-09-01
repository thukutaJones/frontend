import type { Metadata } from "next";
import TopBar from "@/components/root/TopBar";

export const metadata: Metadata = {
  title: "Profile | Wez Medical Centre",
  description: "",
};

export default function ProfileLayout({
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
