import { useCallback, useState } from "react";
import MenuPage from "./pages/MenuPage.jsx";
import GamePage from "./pages/GamePage.jsx";
import GameOverPage from "./pages/GameOverPage.jsx";
import { useHighScore } from "./hooks/useHighScore.js";
import { useFullscreen } from "./hooks/useFullscreen.js";


export default function App() {
  const [screen, setScreen] = useState("menu");
  const [result, setResult] = useState(null);
  const [highScore, submitScore] = useHighScore();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const startGame = useCallback(() => setScreen("game"), []);
  const goToMenu = useCallback(() => setScreen("menu"), []);

  const handleGameOver = useCallback(
    (stats) => {
      const isRecord = submitScore(stats.score);
      setResult({ ...stats, isRecord }); 
      setScreen("gameover");
    },
    [submitScore]
  );

  return (
    <div className="app">
      {screen === "menu" && (
        <MenuPage
          highScore={highScore}
          onStart={startGame}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
      )}
      {screen === "game" && (
        <GamePage highScore={highScore} onGameOver={handleGameOver} />
      )}
      {screen === "gameover" && (
        <GameOverPage
          result={result}
          highScore={highScore}
          onRestart={startGame}
          onMenu={goToMenu}
        />
      )}
    </div>
  );
}
