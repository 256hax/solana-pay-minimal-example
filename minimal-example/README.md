# Solana Pay Minimal Example

## Original Code
This programs copy from [solana-pay example](https://github.com/solana-labs/solana-pay/tree/master/core) then customize for minimal example.

## Run
```
% npm i
% npm run dev
```

## Screenshot
![Screenshot](https://github.com/256hax/solana-pay-example/blob/main/minimal-example/docs/screenshot.png?raw=true)  
![Screenshot Phantom](https://github.com/256hax/solana-pay-minimal-example/blob/main/minimal-example/docs/screenshot-phantom.PNG?raw=true)  

## How to Send Token
[Optional. SPL token transfer](https://docs.solanapay.com/core/transfer-request/merchant-integration#optional-spl-token-transfer)

```
For SPL Token transfers, use the spl-token parameter. The spl-token is the mint address of the SPL token.

/**
 * Simulate a checkout experience with an SPL token
 */
console.log('2. 🛍 Simulate a customer checkout \n');
const splToken = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

/**
 * Create a payment request link
 *
 * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
 * Several parameters are encoded within the link representing an intent to collect payment from a customer.
 */
console.log('3. 💰 Create a payment request link \n');
const url = encodeURL({
    recipient,
    amount,
    splToken,
    reference,
    label,
    message,
    memo,
});
```