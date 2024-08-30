import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

function App() {
  const sapphireAccount = useAccount()
  const sapphireAddress = sapphireAccount.address

  return (
    <div>
      <ConnectButton />
      {sapphireAddress}
    </div>
  )
}

export default App
