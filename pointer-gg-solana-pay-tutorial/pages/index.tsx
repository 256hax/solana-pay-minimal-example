import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import SiteHeading from '../components/SiteHeading'

export default function HomePage() {
  // We get the public key of the connected wallet, if there is one
  const { publicKey } = useWallet()

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto">
      <SiteHeading>Cookies Inc</SiteHeading>

      <a href="http://localhost:3000/cart/">Solana Pay Cart Checkout</a>
      <a href="http://localhost:3000/qr/">Solana Pay QR Checkout</a>
    </div>
  )
}