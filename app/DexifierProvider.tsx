"use client";

import React from "react";
import { WidgetProvider, WidgetConfig } from "@rango-dev/widget-embedded";
import QueueManager from "./providers/QueueManager";

const DexifierProvider = ({
  config,
  children,
}: {
  config: WidgetConfig;
  children: React.ReactNode;
}) => {
  return (
    <WidgetProvider config={config}>
      <QueueManager apiKey={config.apiKey}>
        {children}
      </QueueManager>
    </WidgetProvider>
  );
};

export default DexifierProvider;