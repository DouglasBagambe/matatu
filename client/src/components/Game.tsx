import React, { useState, useEffect } from "react";
import "../styles/Game.css"; // Make sure to have custom styling for animations and UI

// Define the card types and structure
interface Card {
  id: number;
  name: string;
  value: number;
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  imageUrl: string;
  description: string;
}

// Game logic to shuffle and manage the deck
const createDeck = (): Card[] => {
  const suits: ("hearts" | "diamonds" | "clubs" | "spades")[] = [
    "hearts",
    "diamonds",
    "clubs",
    "spades",
  ];
  const values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1 is Ace, 11-13 are Jack, Queen, King

  let deck: Card[] = [];

  suits.forEach((suit) => {
    values.forEach((value, idx) => {
      deck.push({
        id: Math.random(),
        name: `${value === 1 ? "Ace" : value} of ${suit}`,
        value,
        suit,
        imageUrl: `/assets/cards/${value}_of_${suit}.png`, // Place your card images in the 'assets/cards' folder
        description: `This is the ${value === 1 ? "Ace" : value} of ${suit}`,
      });
    });
  });

  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
};

const Game: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [opponentHand, setOpponentHand] = useState<Card[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState(1); // 1 for player, 2 for opponent

  useEffect(() => {
    const initialDeck = createDeck();
    setDeck(initialDeck);
  }, []);

  const drawCard = (
    handSetter: React.Dispatch<React.SetStateAction<Card[]>>
  ) => {
    if (deck.length > 0) {
      const card = deck.pop();
      handSetter((prevHand) => [...prevHand, card!]);
      setDeck([...deck]); // Update deck after drawing
    }
  };

  const playTurn = () => {
    if (turn === 1) {
      // Player's turn: Draw a card
      drawCard(setPlayerHand);
      setTurn(2); // Switch to opponent's turn
    } else {
      // Opponent's turn: Simulate a random card draw
      drawCard(setOpponentHand);
      setTurn(1); // Switch to player's turn
    }
  };

  const checkWinner = () => {
    const playerScore = playerHand.reduce(
      (total, card) => total + card.value,
      0
    );
    const opponentScore = opponentHand.reduce(
      (total, card) => total + card.value,
      0
    );

    if (playerScore > opponentScore) {
      alert("Player wins!");
    } else if (playerScore < opponentScore) {
      alert("Opponent wins!");
    } else {
      alert("It's a tie!");
    }
    setGameOver(true);
  };

  useEffect(() => {
    if (
      deck.length === 0 ||
      playerHand.length === 5 ||
      opponentHand.length === 5
    ) {
      checkWinner(); // Game ends when deck is empty or a player has 5 cards
    }
  }, [deck, playerHand, opponentHand]);

  return (
    <div className="game-screen">
      <h1>Welcome to the Epic Card Game!</h1>
      <div className="game-container">
        <div className="player-hand">
          <h2>Your Hand</h2>
          <div className="card-container">
            {playerHand.map((card) => (
              <div className="card" key={card.id}>
                <img src={card.imageUrl} alt={card.name} />
                <p>{card.name}</p>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="center-actions">
          <button
            className={`cta-button ${gameOver ? "disabled" : ""}`}
            onClick={playTurn}
            disabled={gameOver}
          >
            {turn === 1 ? "Your Turn: Draw Card" : "Opponent's Turn"}
          </button>
        </div>

        <div className="opponent-hand">
          <h2>Opponent's Hand</h2>
          <div className="card-container">
            {opponentHand.map((card) => (
              <div className="card" key={card.id}>
                <img src={card.imageUrl} alt={card.name} />
                <p>{card.name}</p>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
