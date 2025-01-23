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
const DexifierProvider = dynamic(() => import("./providers/DexifireProvider"), {
  ssr: false, // Ensures this component renders only on the client side
});

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
        <DexifierProvider>
          <MainNavbar />
          {children}
        </DexifierProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
