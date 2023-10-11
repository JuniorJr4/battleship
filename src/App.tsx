import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Battleship from "./components/Battleship";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/battleship" element={<Battleship />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
