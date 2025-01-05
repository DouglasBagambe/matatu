import React, { useState } from "react";
import "./App.css";

function App() {
  const [playerAddress, setPlayerAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleJoinGame = async () => {
    if (!playerAddress) {
      alert("Please enter your wallet address!");
      return;
    }

    setLoading(true);
    try {
      const { joinGame } = await import("./services/contractService");
      const tx = await joinGame(playerAddress);
      console.log("Transaction successful:", tx);
      alert("You successfully joined the game!");
    } catch (error) {
      console.error("Error joining game:", error);
      alert("Failed to join the game. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="hero-section">
        <div className="content">
          <h1 className="main-title">🎴 MATATU 🎴</h1>
          <p className="sub-title">
            A blockchain-powered card game where strategy meets rewards!
          </p>
          <div className="input-section">
            <input
              type="text"
              value={playerAddress}
              onChange={(e) => setPlayerAddress(e.target.value)}
              placeholder="Enter your wallet address"
              className="wallet-input"
            />
            <button
              onClick={handleJoinGame}
              disabled={loading}
              className={`cta-button ${loading ? "disabled" : ""}`}
            >
              {loading ? "Joining..." : "Join the Game"}
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Made with by dyson</p>
      </footer>
    </div>
  );
}

export default App;
