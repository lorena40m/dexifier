"use client";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { InjectedConnector } from 'wagmi/connectors/injected';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = "1810ec8721bc30ad15dcbf39facc2939";

// 2. Create wagmiConfig
const metadata = {
  name: "dexifier",
  description: "Web3Modal Example",
  url: "https://dexifier.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const chains = [mainnet, arbitrum] as const;
// const connectors = [
//   new InjectedConnector({ chains, options: { name: 'MetaMask' } }),
//   new InjectedConnector({ chains, options: { name: 'XDEFI' } }),
// ];
const config = defaultWagmiConfig({
  // connectors,
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

const Web3ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
export default Web3ModalProvider;
