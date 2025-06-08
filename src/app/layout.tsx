import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/cart";

export const metadata: Metadata = {
  title: "Vorks",
  description: "Home Service Application",
  icons: [{ rel: "icon", url: "/logo_vorks.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="scroll-smooth overflow-x-hidden p-0 m-0">
        <CartProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster></Toaster>
        </CartProvider>
      </body>
    </html>
  );
}
