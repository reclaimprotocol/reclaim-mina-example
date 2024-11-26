# Reclaim Mina Example

## Overview

This frontend application allows users to generate a claim QR code, scan it with their phone, complete the verification process, and then verify the proof on the Mina blockchain network. The application integrates with the Reclaim Protocol and a zkApp smart contract deployed on Mina's Devnet.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js and npm**: Install [Node.js](https://nodejs.org/) (which includes npm).
- **Auro Wallet**: Install the [Auro Wallet extension](https://www.aurowallet.com/) in your browser.
- **Mina Account**: Create a Mina account using Auro Wallet and fund it using the [Mina Faucet](https://faucet.minaprotocol.com/).
- **Reclaim Protocol App Credentials**: Obtain your `APP_ID`, `APP_SECRET`, and desired `PROVIDER_ID` from the [Reclaim Protocol](https://dev.reclaimprotocol.org/).

## Setup Instructions

1. **Clone the Repository**
    
    ```bash
    git clone https://gitlab.reclaimprotocol.org/starterpacks/reclaim-mina-example.git
    cd reclaim-mina-example
    ```
    
2. **Install Dependencies**
    
    ```bash
    npm install
    ```
    
3. **Configure the Application**
    
    Update the necessary configurations in `app/page.tsx` (see Configuration section).
    
4. **Run the Application**
    
    ```bash
    npm run dev
    ```
    
5. **Access the Application**
    
    Open your browser and navigate to `http://localhost:3000`.
    

## Configuration

### 1. Update Contract Address

In `app/page.tsx`, replace the placeholder zkApp contract address with your own if you have deployed your own contract:

```tsx
const ZKAPP_ADDRESS = "REPLACE_WITH_YOUR_CONTRACT_ADDRESS";
```

### 2. Update Reclaim Protocol Credentials

Replace the example `APP_ID`, `APP_SECRET`, and `PROVIDER_ID` with your actual credentials:

```tsx
const APP_ID = "REPLACE_WITH_YOUR_APP_ID"; // Replace with your App ID
const APP_SECRET = "REPLACE_WITH_YOUR_APP_SECRET"; // Replace with your App Secret
const PROVIDER_ID = "REPLACE_WITH_YOUR_PROVIDER_ID"; // Replace with your Provider ID
```

- **`APP_ID`**: Your application ID obtained from Reclaim Protocol.
- **`APP_SECRET`**: Your application secret key from Reclaim Protocol.
- **`PROVIDER_ID`**: The provider ID for the service you want to use (e.g., GitHub, Twitter).

### 3. Optional Configuration

- **Transaction Fee**: Adjust the transaction fee if necessary:
    
    ```tsx
    let transactionFee = 0.1; // Adjust as needed
    ```
    

## Usage

### Step 1: Generate Claim QR Code

- Click on the **"Create Claim QR Code"** button.
- A QR code will be displayed on the screen.

### Step 2: Scan QR Code with Your Phone

- Use your phone's camera or a QR code scanning app to scan the displayed QR code.
- Complete the verification process on your phone by following the prompts.

### Step 3: Verify Proof on Mina Network

- After successful verification on your phone, the **"Verify Proof"** button will appear on the frontend.
- Click on **"Verify Proof"** to submit the proof to the Mina network.
- Approve the transaction in your Auro Wallet extension when prompted.

### Step 4: View Transaction

- Once the transaction is processed, a link to view the transaction on Mina's block explorer will be provided.
- Click on **"View transaction"** to see the transaction details.

### Step 5: Refresh Proof Count (Optional)

- The frontend displays the number of proofs verified by the zkApp.
- You can refresh this number by clicking the **"Refresh Proof Count"** button if implemented.

## Important Notes

- **Contract Deployment**: If you have deployed your own zkApp contract, ensure the contract address is updated in the `ZKAPP_ADDRESS` variable.
- **Reclaim Protocol Credentials**: Use your own `APP_ID`, `APP_SECRET`, and `PROVIDER_ID` to interact with the Reclaim Protocol.
- **Wallet Connection**: Ensure that the Auro Wallet extension is installed and connected to the Mina Devnet.
- **Account Funding**: Your Mina account must have sufficient funds to cover transaction fees. Use the [Mina Faucet](https://faucet.minaprotocol.com/) if necessary.

## Troubleshooting

### Wallet Not Found

If the application displays "Wallet not found":

- Ensure the Auro Wallet extension is installed in your browser.
- Refresh the page after installing the wallet.

### Account Does Not Exist

If your account does not exist on the network:

- Use the [Mina Faucet](https://faucet.minaprotocol.com/) to fund your account.
- Wait a few minutes and refresh the page.