import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Q4Q Quran Core",
  description: "MoonWitness II — Q4Q Quran Foundation Explorer"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
