import React, { useState } from "react";
import { createMatch } from "../services/apiService";
import { joinGame } from "../services/contractService";

const GameLobby: React.FC = () => {
  const [playerAddress, setPlayerAddress] = useState("");
  const [matchId, setMatchId] = useState("");

  const handleJoinGame = async () => {
    try {
      const match = await createMatch(playerAddress);
      setMatchId(match.id);
      await joinGame(playerAddress);
      alert("Game joined successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to join game!");
    }
  };

  return (
    <div>
      <h1>Matatu Game Lobby</h1>
      <input
        type="text"
        value={playerAddress}
        onChange={(e) => setPlayerAddress(e.target.value)}
        placeholder="Enter your wallet address"
      />
      <button onClick={handleJoinGame}>Join Game</button>
      {matchId && <p>Match ID: {matchId}</p>}
    </div>
  );
};

export default GameLobby;
