import MainNavbar from "./_components/MainNavbar";
import Web3ModalProvider from "./providers/Web3ModalProvider";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { StateProvider } from "@/redux_slice/provider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import React from "react";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dexifier",
  description:
    "Dexifier is a cutting-edge project built using NEXT14 and SHADCN, dedicated to providing easy and infinite exchange routes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainNavbar />
        <StateProvider>{children}</StateProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
