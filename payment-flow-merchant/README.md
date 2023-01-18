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
Connection to cluster established: https://api.devnet.solana.com { 'feature-set': 3036606309, 'solana-core': '1.14.10' }

2. 🛍 Simulate a customer checkout 

MERCHANT_WALLET => mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN
label => Jungle Cats store
message => Jungle Cats store - your order - #001234
memo => JC#4098
amount => 1
reference => G7SfGmmDUnXnWisaN57q3bzGa4SkniUFBn7KpshUCap9
3. 💰 Create a payment request link 

url => solana:mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN?amount=1&reference=G7SfGmmDUnXnWisaN57q3bzGa4SkniUFBn7KpshUCap9&label=Jungle+Cats+store&message=Jungle+Cats+store+-+your+order+-+%23001234&memo=JC%234098
4. 🔐 Simulate wallet interaction 

label:  Jungle Cats store
message:  Jungle Cats store - your order - #001234

5. Find the transaction
Checking for transaction...: 1

--- snip ---

 🖌  Signature found:  4MUt3yn8n88UsxWPMpL7vGgCsJ8oa9Z8zbdLuE34qFLvMCVNXJ1oFCJcMx1nq31WuZeZpCE49p1CKcGFTTjVTBgv

6. 🔗 Validate transaction 

✅ Payment validated
📦 Ship order to customer
```