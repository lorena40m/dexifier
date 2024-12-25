"use client";

import React, { useEffect } from "react";
import { WidgetProvider, WidgetConfig } from "@rango-dev/widget-embedded";
import QueueManager from "./providers/QueueManager";
import { useRouter } from 'next/navigation'

const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
};

const DexifierProvider = ({
  config,
  children,
}: {
  config: WidgetConfig;
  children: React.ReactNode;
}) => {
  const router = useRouter()
  useEffect(() => {
    if (isMobileDevice()) {
      router.replace('/dex/exchange'); // Redirect to /mobile
    }
  }, []);
  
  return (
    <WidgetProvider config={config}>
      <QueueManager apiKey={config.apiKey}>
        {children}
      </QueueManager>
    </WidgetProvider>
  );
};

export default DexifierProvider;