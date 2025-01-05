import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import GameLobby from "./components/GameLobby"; // Import your GameLobby component
import Game from "./components/Game"; // Import the Game screen

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameLobby />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
