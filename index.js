import { abi, contractAddress } from "./constants.js";

const connectButton = document.querySelector(".connect");
const withdrawButton = document.querySelector(".withdraw");
const fundForm = document.querySelector(".form");
const sendButton = document.querySelector(".fund");
const fundButton = document.querySelector(".display-fund");
const mining = document.querySelector(".mining");
const waiting = document.querySelector(".waiting");
const completed = document.querySelector(".completed");
const success = document.querySelector(".success");
connectButton.onclick = connect;
withdrawButton.onclick = withdraw;
sendButton.onclick = fund;
fundButton.onclick = displayFund;

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            connectButton.src = "/fundme-ui/connected.png";
        } catch (error) {
            alert("Unexpected error occured! Please reconnect");
            console.error("Error caught:", error);
        }
    } else {
        alert(
            "Please install MetaMask or open the site directly in MetaMask's browser if you are on mobile"
        );
    }
}

function displayFund() {
    if (fundForm.style.display === "none" || fundForm.style.display === "") {
        fundForm.style.display = "flex";
    } else {
        fundForm.style.display = "none";
    }
}

async function fund() {
    if (typeof window.ethereum !== "undefined") {
        try {
            const inputValue = document.querySelector(".ethAmount").value;
            const transactionResponse = await contract.fund({
                value: ethers.parseEther(inputValue),
            });
            listenForTransactionEvents(transactionResponse);
        } catch (error) {
            console.error("Error caught:", error);
            alert(
                "Unexpected errror occcured! Please check your balance or increase ETH amount."
            );
        }
    } else {
        alert(
            "Please install MetaMask or open the site directly in MetaMask's browser if you are on mobile"
        );
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        await handleTx(() => contract.withdraw(), "Withdrawal successful!✅");
    } else {
        alert(
            "Please install MetaMask or open the site directly in MetaMask's browser if you are on mobile"
        );
    }
}

async function listenForTransactionEvents(transactionResponse) {
    mining.innerHTML = "Txn mine:";
    displayTxHash(transactionResponse.hash);
    waiting.innerHTML = "Waiting for confirmation...";
    const transactionReceipt = await transactionResponse.wait();
    const confirmationNumber = await transactionReceipt.confirmations();
    completed.innerHTML = `Completed with ${confirmationNumber} block confirmation`;
    success.innerHTML = "Transaction successful!✅";
}

function shortenMiddle(text, maxLength = 20) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    let half = Math.floor(maxLength / 2);
    return text.slice(0, half) + "..." + text.slice(-half);
}

function displayTxHash(hash) {
    const hashElement = document.querySelector(".hash");
    hashElement.textContent = shortenMiddle(hash, 18);
}

function getReadableError(error) {
    // ✅ If ethers decoded a custom error from ABI
    if (error.errorName) {
        const customErrorMap = {
            NotOwner: "You are not authorized to make Withdrawals!",
        };
        return (
            customErrorMap[error.errorName] ||
            `Custom error: ${error.errorName}`
        );
    }
    // ✅ Fallback for unknown custom error
    if (
        error.message?.includes("unknown custom error") ||
        error.reason === null
    ) {
        // If this specific one is our withdraw case, make it readable
        return "You are not authorized to make Withdrawals!";
    }
    // ✅ Generic fallback
    return (
        error.reason ||
        error.data?.message ||
        error.error?.message ||
        error.message ||
        "An unknown error occurred"
    );
}

async function handleTx(txCallback, successMessage) {
    try {
        const txResponse = await txCallback(); // Execute the function
        await txResponse.wait();
        alert(successMessage);
    } catch (error) {
        const errorMsg = getReadableError(error);
        alert(errorMsg);
        console.error("Transaction failed:", error);
    }
}
