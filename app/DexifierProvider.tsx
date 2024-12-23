"use client";

import React from "react";
import { WidgetProvider, WidgetConfig } from "@rango-dev/widget-embedded";

const DexifierProvider = ({
  config,
  children,
}: {
  config: WidgetConfig;
  children: React.ReactNode;
}) => {
  return (
    <WidgetProvider config={config}>
      {children}
    </WidgetProvider>
  );
};

export default DexifierProvider;