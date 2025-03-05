'use client'

import React from "react";
import { WidgetProvider, WidgetConfig } from "@rango-dev/widget-embedded";
import QueueManager from "./QueueManager";

const DEXIFIER_CONFIG: WidgetConfig = {
  apiKey: process.env.NEXT_PUBLIC_RANGO_API_KEY || process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || '',
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

const RangoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WidgetProvider config={DEXIFIER_CONFIG}>
      <QueueManager apiKey={DEXIFIER_CONFIG.apiKey}>
        {children}
      </QueueManager>
    </WidgetProvider>
  );
}

export default RangoProvider