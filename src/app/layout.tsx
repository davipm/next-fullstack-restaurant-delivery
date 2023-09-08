import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Notification from "@/components/Notification";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Best food",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Notification />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
