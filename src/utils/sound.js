
let audioCtx = null;

const SOUNDS = {
  shoot:  { freq: 700, end: 300,  duration: 0.08, type: "square",   volume: 0.04 },
  hit:    { freq: 200, end: 80,   duration: 0.12, type: "sawtooth", volume: 0.06 },
  kill:   { freq: 400, end: 100,  duration: 0.2,  type: "triangle", volume: 0.08 },
  pickup: { freq: 500, end: 1000, duration: 0.15, type: "sine",     volume: 0.08 },
  level:  { freq: 300, end: 900,  duration: 0.4,  type: "square",   volume: 0.06 },
  over:   { freq: 300, end: 40,   duration: 0.9,  type: "sawtooth", volume: 0.1 },
};

export const playSound = (name) => {
  const sound = SOUNDS[name];
  if (!sound) return;
  try {
    audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const { freq, end, duration, type, volume } = sound; // destructuring
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(end, now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain).connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + duration);
  } catch {
    
  }
};
