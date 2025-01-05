import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { joinGame } from "../services/contractService";
import "../styles/GameLobby.css";

const GameLobby: React.FC = () => {
  const [playerAddress, setPlayerAddress] = useState("");
  const [matchId, setMatchId] = useState("");
  const navigate = useNavigate();

  const handleJoinGame = async () => {
    try {
      // Mock creating match (normally this would call backend to create a match)
      const match = { id: "mockMatch123" };
      setMatchId(match.id);

      // Call the mocked joinGame function
      await joinGame(playerAddress);
      alert("Game joined successfully!");

      // Navigate to the game screen
      navigate("/game");
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
