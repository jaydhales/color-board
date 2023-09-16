import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { sepolia } from "viem/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const { VITE_SEPOLIA_API } = import.meta.env;

const { chains, publicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: VITE_SEPOLIA_API! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Color Board",
  projectId: "01",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
