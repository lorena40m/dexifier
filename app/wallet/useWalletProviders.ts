import type { ProviderInterface } from "@rango-dev/wallets-react";
import { useEffect } from "react";
import { WidgetConfig } from "./types";
import { matchAndGenerateProviders, ProvidersOptions } from "./utils/providers";
import { clearConnectedWallet } from "@/redux_slice/slice/walletSlice";

export function useWalletProviders(
  providers: WidgetConfig["wallets"],
  options?: ProvidersOptions,
) {
  let generateProviders: ProviderInterface[] = matchAndGenerateProviders(
    providers,
    {
      walletConnectProjectId: options?.walletConnectProjectId,
    },
  );

  useEffect(() => {
    clearConnectedWallet({});
    generateProviders = matchAndGenerateProviders(providers, {
      walletConnectProjectId: options?.walletConnectProjectId,
    });
  }, [providers?.length]);

  return {
    providers: generateProviders,
  };
}
