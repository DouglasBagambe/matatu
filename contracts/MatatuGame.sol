// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract MatatuGame {
    struct Game {
        address player1;
        address player2;
        uint256 stake;
        bool isActive;
        address winner;
    }

    uint256 public gameCounter; // Unique ID for each game
    mapping(uint256 => Game) public games;

    event GameStarted(uint256 gameId, address player1, address player2, uint256 stake);
    event GameEnded(uint256 gameId, address winner, uint256 winnings);

    // Function to start a new game
    function startGame(address _opponent) external payable {
        require(msg.value > 0, "Stake must be greater than zero");

        // Create a new game
        gameCounter++;
        games[gameCounter] = Game({
            player1: msg.sender,
            player2: _opponent,
            stake: msg.value,
            isActive: true,
            winner: address(0)
        });

        emit GameStarted(gameCounter, msg.sender, _opponent, msg.value);
    }

    // Function to end a game
    function endGame(uint256 _gameId, address _winner) external {
        Game storage game = games[_gameId];
        require(game.isActive, "Game is not active");
        require(game.player1 == msg.sender || game.player2 == msg.sender, "Not a participant");
        require(_winner == game.player1 || _winner == game.player2, "Invalid winner");

        // Mark the game as ended
        game.isActive = false;
        game.winner = _winner;

        // Transfer the winnings
        uint256 winnings = game.stake * 2;
        payable(_winner).transfer(winnings);

        emit GameEnded(_gameId, _winner, winnings);
    }
}
