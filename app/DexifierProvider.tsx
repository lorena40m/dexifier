"use client";

import React, { useEffect } from "react";
import { WidgetProvider, WidgetConfig } from "@rango-dev/widget-embedded";
import QueueManager from "./providers/QueueManager";
import { useRouter } from 'next/navigation'

const DEXIFIER_CONFIG: WidgetConfig = {
  apiKey: process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || process.env.NEXT_PUBLIC_RANGO_API_KEY || '',
  title: 'Dexifier',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  multiWallets: true,
  excludeLiquiditySources: true,
  customDestination: true,
  trezorManifest: {
    appUrl: 'https://widget.rango.exchange/',
    email: 'hi+trezorwidget@rango.exchange',
  },
  tonConnect: {
    manifestUrl: 'https://raw.githubusercontent.com/rango-exchange/assets/refs/heads/main/manifests/tonconnect/manifest.json'
  },
};

const DexifierProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter()
  
  const isMobileDevice = (): boolean => {
    const userAgent = navigator.userAgent;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  };
  
  useEffect(() => {
    if (isMobileDevice()) {
      router.replace('/dex/exchange'); // Redirect to /dex/exchange for mobile device
    }
  }, []);
  
  return (
    <WidgetProvider config={DEXIFIER_CONFIG}>
      <QueueManager apiKey={DEXIFIER_CONFIG.apiKey}>
        {children}
      </QueueManager>
    </WidgetProvider>
  );
};

export default DexifierProvider;