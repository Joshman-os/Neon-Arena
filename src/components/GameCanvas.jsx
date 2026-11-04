import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { createGameConfig } from "../game/config.js";
import { gameEvents } from "../game/events.js";


export default function GameCanvas({ onGameOver }) {
  const parentRef = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game(createGameConfig(parentRef.current));
    gameEvents.on("gameover", onGameOver);

    return () => {
      gameEvents.off("gameover", onGameOver);
      game.destroy(true);
    };
  }, [onGameOver]);

  return <div ref={parentRef} className="game-canvas" />;
}
