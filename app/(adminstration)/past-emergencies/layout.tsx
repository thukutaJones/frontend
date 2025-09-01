import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergencies | Wez Medical Centre",
  description: "",
};

export default function EmergenciesLayout({
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
