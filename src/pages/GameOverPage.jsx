import Button from "../components/Button.jsx";
import { useKeyPress } from "../hooks/useKeyPress.js";
import { formatTime } from "../utils/format.js";

const RESTART_KEYS = ["Enter", "Space"];
const MENU_KEYS = ["Escape"];

export default function GameOverPage({ result, highScore, onRestart, onMenu }) {
  const { score, level, time, isRecord } = result;

  useKeyPress(RESTART_KEYS, onRestart);
  useKeyPress(MENU_KEYS, onMenu);

  return (
    <div className="screen">
      <h1 className="title danger">PELI OHI</h1>

      {isRecord && <p className="big-text highlight">★ UUSI ENNÄTYS! ★</p>}
      <p className="big-text">PISTEET: {score}</p>
      <p className="big-text">TASO: {level} &nbsp; AIKA: {formatTime(time)}</p>
      <p className="hint">Ennätys: {highScore}</p>

      <div className="row">
        <Button label="PELAA UUDELLEEN" onClick={onRestart} autoFocus />
        <Button label="VALIKKO" onClick={onMenu} variant="secondary" />
      </div>
      <p className="hint">ENTER = uudelleen &nbsp; ESC = valikko</p>
    </div>
  );
}
