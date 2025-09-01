import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments | Wez Medical Centre",
  description: "",
};

export default function AppointmentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="font-sans text-gray-900 antialiased">{children}</main>
  );
}
