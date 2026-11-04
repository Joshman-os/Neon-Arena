import Button from "../components/Button.jsx";
import { useKeyPress } from "../hooks/useKeyPress.js";

const START_KEYS = ["Enter", "Space"];

export default function MenuPage({ highScore, onStart, isFullscreen, onToggleFullscreen }) {
  useKeyPress(START_KEYS, onStart);

  return (
    <div className="screen">
      <h1 className="title">NEON ARENA</h1>
      <p className="big-text highlight">ENNÄTYS: {highScore}</p>

      <div className="row">
        <Button label="ALOITA PELI" onClick={onStart} autoFocus />
        <Button
          label={isFullscreen ? "ULOS KOKO NÄYTÖSTÄ" : "KOKO NÄYTTÖ (F)"}
          onClick={onToggleFullscreen}
          variant="secondary"
        />
      </div>

      <p className="hint">
        Liiku: NUOLINÄPPÄIMILLÄ tai WASD<br />
        Pelaaja ampuu automaattisesti lähintä vihollista<br />
        Kerää vihreät neliöt ja selviä mahdollisimman pitkään<br />
        Aloita: ENTER tai VÄLILYÖNTI
      </p>
    </div>
  );
}
