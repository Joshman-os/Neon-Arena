import Phaser from "phaser";
import { ENEMY_TYPES, GAME_HEIGHT, GAME_WIDTH, SETTINGS } from "../config.js";


const randomEdgePoint = () => {
  const margin = 40;
  const side = Phaser.Math.Between(0, 3);
  switch (side) {
    case 0: return { x: Phaser.Math.Between(0, GAME_WIDTH), y: -margin };
    case 1: return { x: GAME_WIDTH + margin, y: Phaser.Math.Between(0, GAME_HEIGHT) };
    case 2: return { x: Phaser.Math.Between(0, GAME_WIDTH), y: GAME_HEIGHT + margin };
    default: return { x: -margin, y: Phaser.Math.Between(0, GAME_HEIGHT) };
  }
};

/** Valitsee satunnaisen vihollistyypin, joka on jo avautunut kyseisellä tasolla. */
const pickType = (level) => {
  const available = ENEMY_TYPES.filter((type) => type.minLevel <= level);
  return Phaser.Utils.Array.GetRandom(available);
};

/** Luo vihollisen ryhmään. Vihollinen on punainen neliö kuten alkuperäisessä enemies.js:ssä. */
export const spawnEnemy = (scene, group, level) => {
  const type = pickType(level);
  const { x, y } = randomEdgePoint();

  const enemy = scene.add.rectangle(x, y, type.size, type.size, type.color).setStrokeStyle(3, 0xffffff);
  group.add(enemy);

  enemy.hp = type.hp;
  enemy.points = type.points;
  enemy.color = type.color;
  enemy.speed = type.speed * (1 + (level - 1) * SETTINGS.speedPerLevel);
  return enemy;
};

/** Kaikki viholliset liikkuvat kohti pelaajaa (sama idea kuin alkuperäisessä update()-metodissa). */
export const updateEnemies = (scene, group, target) => {
  group.getChildren().forEach((enemy) => {
    scene.physics.moveToObject(enemy, target, enemy.speed);
  });
};
