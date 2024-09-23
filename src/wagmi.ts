import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { sapphireTestnet } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'sapphire-stake-subcall',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [sapphireTestnet],
  ssr: false, // If your dApp uses server side rendering (SSR)
  batch: {
    multicall: false,
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
