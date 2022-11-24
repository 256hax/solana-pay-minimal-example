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

## Message Log
```
Let's simulate a Solana Pay flow ... 

1. ✅ Establish connection to the cluster

2. 🛍 Simulate a customer checkout 

3. 💰 Create a payment request link 

url.href => solana:55AfqEL3TC9mpkDZ63UCgDrzPcMQd5aZtDegfQCWQ5tK?amount=0.001&reference=DvQaGfvQ6imjEJmhymTgFx2LeH2E4uiHjg7jWtKLYENL&label=Jungle+Cats+store&message=Jungle+Cats+store+-+your+order+-+%23001234&memo=JC%234098

4. 🔐 Simulate wallet interaction 

tx => Transaction {signatures: Array(0), feePayer: PublicKey, instructions: Array(2), recentBlockhash: '7xorxBHpJwAKZMZngqHs2rdZN2cZoPxKbgUwL7UiC6Sy', lastValidBlockHeight: undefined, …}

signature => 5gXmgaW7Xv4GuCkj82V3oCmdhy3sPLgY8xcuBu1kQVZw3FFL9M8UefiAVad7Pcjt5jrUx9XQMGsAGD5tPeVmizcr

paymentStatus => pending

5. Find the transaction

🖌  Signature found:  5gXmgaW7Xv4GuCkj82V3oCmdhy3sPLgY8xcuBu1kQVZw3FFL9M8UefiAVad7Pcjt5jrUx9XQMGsAGD5tPeVmizcr

6. 🔗 Validate transaction 

✅ Payment validated
📦 Ship order to customer
```

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