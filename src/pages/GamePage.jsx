import GameCanvas from "../components/GameCanvas.jsx";
import Hud from "../components/Hud.jsx";

export default function GamePage({ highScore, onGameOver }) {
  return (
    <div className="game-wrapper">
      <GameCanvas onGameOver={onGameOver} />
      <Hud highScore={highScore} />
    </div>
  );
}
