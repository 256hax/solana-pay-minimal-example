// --- Lib ---
import BigNumber from 'bignumber.js';

// --- Solana Common ---
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

// --- Solana Wallet Adapter ---
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

// --- Solana Pay ---
import {
  encodeURL,
  parseURL,
  createTransfer,
  findReference,
  FindReferenceError,
  validateTransfer,
} from '@solana/pay';
import { useState } from 'react';

export const PaymentPage = () => {
  const { connection } = useConnection();
  // const connection = new Connection('<QuickNode RPC>', 'confirmed');
  const { publicKey, sendTransaction } = useWallet();

  const MERCHANT_WALLET = new PublicKey('HXtBm8XZbxaTt41uqaKhwUAa6Z1aPyvJdsZVENiWsetg');
  const [valueUrl, setUrl] = useState<any>();
  let paymentStatus: string = '';

  const createPayment = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    console.log("Let's simulate a Solana Pay flow ... \n");

    console.log('1. ✅ Establish connection to the cluster');

    /**
     * Simulate a checkout experience
     *
     * Recommendation:
     * `amount` and `reference` should be created in a trusted environment (server).
     * The `reference` should be unique to a single customer session,
     * and will be used to find and validate the payment in the future.
     *
     * Read our [getting started guide](#getting-started) for more information on the parameters.
     */
    console.log('\n2. 🛍 Simulate a customer checkout \n');

    const label = 'Jungle Cats store';
    const message = 'Jungle Cats store - your order - #001234';
    const memo = 'JC#4098';
    const amount = new BigNumber(0.001);
    const reference = new Keypair().publicKey;

    /**
     * Create a payment request link
     *
     * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
     * Several parameters are encoded within the link representing an intent to collect payment from a customer.
     */
    console.log('3. 💰 Create a payment request link \n');

    const url = encodeURL({
      recipient: MERCHANT_WALLET,
      amount,
      reference,
      label,
      message,
      memo
    });
    console.log('url.href =>', url.href);

    setUrl(url);
  }

  const pay = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    /**
     * Simulate wallet interaction
     *
     * This is only for example purposes. This interaction will be handled by a wallet provider
     */
    console.log('4. 🔐 Simulate wallet interaction \n');

    /**
     * For example only
     *
     * The URL that triggers the wallet interaction; follows the Solana Pay URL scheme
     * The parameters needed to create the correct transaction is encoded within the URL
     */
    const {
      recipient,
      amount,
      reference,
      label,
      message,
      memo
    }: any = parseURL(valueUrl);

    /**
     * Create the transaction with the parameters decoded from the URL
     */
    const tx = await createTransfer(
      connection,
      publicKey, // If use your Keypair: MERCHANT_WALLET.publicKey
      { recipient, amount, reference, memo }
    );
    console.log('tx =>', tx);

    /**
     * Send the transaction to the network
     */
    // sendAndConfirmTransaction(connection, tx, [MERCHANT_WALLET]); // If use your Keypair
    const signature = await sendTransaction(tx, connection);
    console.log('signature =>', signature);

    // Update payment status
    paymentStatus = 'pending';
    console.log('paymentStatus =>', paymentStatus);
  };

  const checkPaymentStatus = async () => {
    /**
     * Wait for payment to be confirmed
     *
     * When a customer approves the payment request in their wallet, this transaction exists on-chain.
     * You can use any references encoded into the payment link to find the exact transaction on-chain.
     * Important to note that we can only find the transaction when it's **confirmed**
     */
    console.log('\n5. Find the transaction');

    /**
     * Retry until we find the transaction
     *
     * If a transaction with the given reference can't be found, the `findTransactionSignature`
     * function will throw an error. There are a few reasons why this could be a false negative:
     *
     * - Transaction is not yet confirmed
     * - Customer is yet to approve/complete the transaction
     *
     * You can implement a polling strategy to query for the transaction periodically.
     */
    const {
      recipient,
      amount,
      reference,
      label,
      message,
      memo
    }: any = parseURL(valueUrl);

    let signatureInfo;

    const { signature }: any = await new Promise((resolve, reject) => {
      /**
       * Retry until we find the transaction
       *
       * If a transaction with the given reference can't be found, the `findTransactionSignature`
       * function will throw an error. There are a few reasons why this could be a false negative:
       *
       * - Transaction is not yet confirmed
       * - Customer is yet to approve/complete the transaction
       *
       * You can implement a polling strategy to query for the transaction periodically.
       */
      const maxRetry = 10;
      let i = 0;

      const interval = setInterval(async () => {
        if(i > maxRetry) { return }
        i += 1;

        console.count('Checking for transaction...');

        try {
          signatureInfo = await findReference(
            connection,
            new PublicKey(reference),
            { finality: 'confirmed' }
          );
          console.log('\n 🖌  Signature found: ', signatureInfo.signature);
          clearInterval(interval);
          resolve(signatureInfo);
        } catch (error: any) {
          if (!(error instanceof FindReferenceError)) {
            console.error(error);
            clearInterval(interval);
            reject(error);
          }
        }
      }, 1000); // Retry every 1sec(=1000)
    });

    /**
     * Validate transaction
     *
     * Once the `findTransactionSignature` function returns a signature,
     * it confirms that a transaction with reference to this order has been recorded on-chain.
     *
     * `validateTransactionSignature` allows you to validate that the transaction signature
     * found matches the transaction that you expected.
     */
    console.log('\n6. 🔗 Validate transaction \n');

    try {
      await validateTransfer(connection, signature, { recipient: MERCHANT_WALLET, amount });

      // Update payment status
      paymentStatus = 'validated';
      console.log('✅ Payment validated');
      console.log('📦 Ship order to customer');
    } catch (error) {
      console.error('❌ Payment failed', error);
    }
  };

  return (
    <>
      <div>
        <button onClick={createPayment}>1. Create Payment</button>
      </div>
      <div>
        <button onClick={pay}>2. Pay</button>
      </div>
      <div>
        <button onClick={checkPaymentStatus}>3. Check Payment Status</button>
      </div>
    </>
  );
};