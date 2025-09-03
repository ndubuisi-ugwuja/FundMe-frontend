# FundMe DApp

A decentralized crowdfunding application built with **JavaScript**, **Ethers.js**, and **MetaMask**.  
This app allows users to **connect their wallet**, **fund a smart contract**, and **withdraw funds** (restricted to the contract owner).

## Live Demo

[View the deployed site on netlify](https://fundmefinance.netlify.app/)

## 🚀 Features

-   **Connect Wallet** via MetaMask.
-   **Fund Contract** with a specified amount of ETH.
-   **Withdraw Funds** (owner-only function with custom error handling).
-   **Readable Error Messages** for better user experience.
-   **Transaction Status Feedback**: mining, waiting for confirmation, and success messages.

---

## 📋 Prerequisites

-   **MetaMask** browser extension installed.
-   Node.js **(optional for local hosting)**.
-   An Ethereum testnet account (**Sepolia**) with test ETH.
-   The smart contract deployed and its **ABI** & **contract address** stored in `constants.js`.

---

## ⚙️ Setup & Installation

1. **Clone the Repository**

```bash
   git clone https://github.com/ndubuisi-ugwuja/FundMe-frontend.git
```

2. Run Locally
   • If you have Live Server in VS Code:
   • Right-click index.html → “Open with Live Server”.
   • Or use Node.js http-server:

```bash
npm install -g http-server
http-server
```

3. Open in Browser
   • Visit: http://localhost:8080 (or the port shown in your terminal).
   • Make sure MetaMask is connected to the same network as your contract.

## 🖥️ index.html

Your HTML file should have:

• A Connect button

• A Withdraw button

• A funding form with ethAmount input field and fund button

• Mining status

• Waiting status

• Confirmation status

• Transaction hash

• Success message

## 🛠 index.js Highlights

• Connect Function — Requests wallet connection via MetaMask.

• Fund Function — Sends ETH to contract.

• Withdraw Function — Only contract owner can withdraw; custom error handling for NotOwner.

• Transaction Listener — Displays mining, waiting, and completion messages.

• Readable Error Handling — Converts raw blockchain errors into user-friendly alerts.

## 🔐 Security Note

• Never expose your private keys or mnemonics in this project.

• The current setup is for testing & demo purposes. Use best practices for production DApps.

## 📜 License

This project is open-source and available under the MIT License.
