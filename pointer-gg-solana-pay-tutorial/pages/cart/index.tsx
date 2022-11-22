import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Products from '../../components/Products'
import SiteHeading from '../../components/SiteHeading'

export default function HomePage() {
  // We get the public key of the connected wallet, if there is one
  const { publicKey } = useWallet()

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto">
      <h2>Cart Checkout</h2>

      {/* We add the Solana wallet connect button */}
      <div className="basis-1/4">
        <WalletMultiButton className='!bg-gray-900 hover:scale-105' />
      </div>

      {/* We disable checking out without a connected wallet */}
      <Products submitTarget='/cart/checkout' enabled={publicKey !== null} />
    </div>
  )
}