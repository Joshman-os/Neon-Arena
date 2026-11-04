import { useEffect, useState } from "react";
import { gameEvents } from "../game/events.js";
import { formatTime } from "../utils/format.js";


export default function Hud({ highScore }) {
  const [stats, setStats] = useState({ score: 0, health: 5, maxHealth: 5, level: 1, time: 0 });

  useEffect(() => {
    gameEvents.on("hud", setStats);
    return () => gameEvents.off("hud", setStats);
  }, []);

  const { score, health, maxHealth, level, time } = stats;

  return (
    <div className="hud">
      <div>
        <div>PISTEET {score}</div>
        <div className="highlight">ENNÄTYS {Math.max(highScore, score)}</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div>TASO {level}</div>
        <div>{formatTime(time)}</div>
      </div>
      <div className="hearts">
        {"♥".repeat(health)}
        {"♡".repeat(maxHealth - health)}
      </div>
    </div>
  );
}
