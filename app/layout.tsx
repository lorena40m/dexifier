import "./globals.css";
import React from "react";
import MainNavbar from "./_components/navbar/MainNavbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { WidgetConfig } from "@rango-dev/widget-embedded";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import DexifierProvider for client-side rendering
const DexifierProvider = dynamic(() => import("./DexifierProvider"), {
  ssr: false, // Ensures this component renders only on the client side
});

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dexifier",
  description:
    "Dexifier is a cutting-edge project built using NEXT14 and SHADCN, dedicated to providing easy and infinite exchange routes.",
};

const DEXIFIER_CONFIG: WidgetConfig = {
  apiKey: process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || process.env.NEXT_PUBLIC_RANGO_API_KEY || '',
  title: 'Dexifier',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  multiWallets: true,
  excludeLiquiditySources: true,
  customDestination: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="root" className={inter.className}>
        <DexifierProvider config={DEXIFIER_CONFIG}>
          <MainNavbar />
          {children}
        </DexifierProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
