const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
const port = 3000;

// Set up provider and contract
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS; // Add your deployed contract address
const contractABI = [
  // Include the ABI of the contract here (we will fetch the ABI once deployed)
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Endpoint to start a game (staking)
app.post("/start-game", async (req, res) => {
  const { playerAddress, stakeAmount } = req.body;
  try {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractWithSigner = contract.connect(signer);

    const tx = await contractWithSigner.deposit({
      value: ethers.utils.parseEther(stakeAmount),
    });
    await tx.wait(); // Wait for transaction to be mined
    res.send({ message: "Game started", transactionHash: tx.hash });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to play the game
app.post("/play-game", async (req, res) => {
  const { playerAddress } = req.body;
  try {
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contractWithSigner = contract.connect(signer);

    const tx = await contractWithSigner.playGame();
    await tx.wait();
    res.send({ message: "Game played", transactionHash: tx.hash });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
