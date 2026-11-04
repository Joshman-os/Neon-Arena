import { useCallback, useState } from "react";
import { loadNumber, saveNumber } from "../utils/storage.js";

const KEY = "neon-arena-highscore";

export function useHighScore() {
  const [highScore, setHighScore] = useState(() => loadNumber(KEY));

  const submitScore = useCallback((score) => {
    if (score > loadNumber(KEY)) {
      saveNumber(KEY, score);
      setHighScore(score);
      return true;
    }
    return false;
  }, []);

  return [highScore, submitScore];
}
