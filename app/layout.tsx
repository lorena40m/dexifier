import "./globals.css";
import React from "react";
import MainNavbar from "./_components/navbar/MainNavbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";
import GoogleAnalytics from "./GoogleAnalytics";

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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dexifier",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'AZAQ3ajFzkdwX4XX-agcNjf6mIRASqRdeAWvxzgFsv8',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
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
