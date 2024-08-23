import React from "react";
import MainNavbar from "./_components/MainNavbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { StateProvider } from "@/redux_slice/provider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
      <body id="root" className={inter.className}>
        <StateProvider>
          <MainNavbar />
          {children}
        </StateProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
