const express = require("express");
const { ethers } = require("ethers");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());

// Mock backend logic (no real contract interaction)
app.post("/start-game", async (req, res) => {
  const { playerAddress, stakeAmount } = req.body;
  try {
    // Mock the transaction process for starting the game
    const mockTransaction = {
      hash: "mockTransactionHash",
      status: "success",
    };

    // Simulating a successful response
    res.send({
      message: "Game started",
      transactionHash: mockTransaction.hash,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/play-game", async (req, res) => {
  const { playerAddress } = req.body;
  try {
    // Mock the transaction process for playing the game
    const mockTransaction = {
      hash: "mockTransactionHash",
      status: "success",
    };

    res.send({ message: "Game played", transactionHash: mockTransaction.hash });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
