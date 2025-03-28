import "./globals.css";
import React from "react";
import MainNavbar from "./_components/navbar/MainNavbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import RangoProvider for client-side rendering
const RangoProvider = dynamic(() => import("./providers/RangoProvider"), {
  ssr: false, // Ensures this component renders only on the client side
});

// Dynamically import DexifierProvider for client-side rendering
const DexifierProvider = dynamic(() => import("./providers/DexifierProvider"), {
  ssr: false, // Ensures this component renders only on the client side
});

// Dynamically import NotificationProvider for client-side rendering
const NotificationProvider = dynamic(() => import("./providers/NotificationProvider"), {
  ssr: false, // Ensures this component renders only on the client side
});

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dexifier",
  description:
    "Trade crypto securely on Dexifier, the best decentralized exchange for fast, low-fee, and anonymous transactions. No sign-ups, just seamless trading.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root" className={inter.className}>
        <RangoProvider>
          <DexifierProvider>
            <NotificationProvider>
              <MainNavbar />
              {children}
            </NotificationProvider>
          </DexifierProvider>
        </RangoProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
