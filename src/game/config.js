import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene.js";

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;


export const SETTINGS = {
  playerSpeed: 320,
  playerSize: 32,
  maxHealth: 5,
  invulnerableMs: 1000,
  fireDelayMs: 300,
  bulletSpeed: 700,
  bulletLifetimeMs: 1500,
  baseSpawnDelayMs: 1200,
  minSpawnDelayMs: 300,
  spawnDelayStepMs: 120, 
  levelDurationSec: 15,
  speedPerLevel: 0.12, 
  pickupChance: 0.15, 
  pickupLifetimeMs: 6000,
};


export const ENEMY_TYPES = [
  { name: "grunt", size: 30, speed: 110, hp: 1, points: 10, color: 0xff3355, minLevel: 1 },
  { name: "runner", size: 20, speed: 200, hp: 1, points: 20, color: 0xff9933, minLevel: 2 },
  { name: "tank", size: 54, speed: 70, hp: 4, points: 50, color: 0xaa44ff, minLevel: 3 },
];

export const createGameConfig = (parent) => ({
  type: Phaser.AUTO,
  parent,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#0a0a1a",
  scale: {
    mode: Phaser.Scale.FIT, 
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: { debug: false },
  },
  scene: [GameScene],
});
