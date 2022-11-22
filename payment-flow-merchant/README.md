# Payment Flow Merchant
@solana/pay modules

## Original Code
This programs copy from [solana-pay example](https://github.com/solana-labs/solana-pay/tree/master/core)

## Run
```
% npm i
% ts-node main.ts
```

### Message Log
```
% ts-node main.ts

Let's simulate a Solana Pay flow ...

1. ✅ Establish connection to the cluster
Connection to cluster established: https://api.devnet.solana.com { 'feature-set': 1365939126, 'solana-core': '1.13.5' }

2. 🛍 Simulate a customer checkout

3. 💰 Create a payment request link

4. 🔐 Simulate wallet interaction

label:  Jungle Cats store
message:  Jungle Cats store - your order - #001234

5. Find the transaction
Checking for transaction...: 1
Checking for transaction...: 2
Checking for transaction...: 3
--- snip ---

 🖌  Signature found:  2h6z2MFe2tomEQ8JbkxvjJNFMWkZJvZJAqo6EJzjo9XQqJDP8uEU54K3Z6BorwA5Vtoruyfny3gA5PokNtPNyiF5

6. 🔗 Validate transaction


 🖌  Signature found:  2h6z2MFe2tomEQ8JbkxvjJNFMWkZJvZJAqo6EJzjo9XQqJDP8uEU54K3Z6BorwA5Vtoruyfny3gA5PokNtPNyiF5
✅ Payment validated
📦 Ship order to customer
```