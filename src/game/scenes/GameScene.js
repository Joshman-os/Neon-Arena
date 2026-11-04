import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH, SETTINGS } from "../config.js";
import { gameEvents } from "../events.js";
import { Player } from "../entities/Player.js";
import { spawnEnemy, updateEnemies } from "../entities/Enemy.js";
import { spawnBullet } from "../entities/Bullet.js";
import { spawnPickup } from "../entities/Pickup.js";
import { playSound } from "../../utils/sound.js";


export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    
    this.score = 0;
    this.level = 1;
    this.elapsed = 0;
    this.isOver = false;

    this.drawBackground();

    this.player = new Player(this, GAME_WIDTH / 2, GAME_HEIGHT / 2);
    this.enemies = this.physics.add.group();
    this.bullets = this.physics.add.group();
    this.pickups = this.physics.add.group();

    
    this.physics.add.overlap(this.bullets, this.enemies, this.onBulletHitsEnemy, null, this);
    this.physics.add.overlap(this.player.sprite, this.enemies, this.onEnemyHitsPlayer, null, this);
    this.physics.add.overlap(this.player.sprite, this.pickups, this.onPickup, null, this);

    
    this.spawnTimer = this.time.addEvent({
      delay: SETTINGS.baseSpawnDelayMs,
      loop: true,
      callback: () => spawnEnemy(this, this.enemies, this.level),
    });

    
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.isOver) return;
        this.elapsed += 1;
        if (this.elapsed % SETTINGS.levelDurationSec === 0) this.nextLevel();
        this.emitHud();
      },
    });

    this.emitHud();
  }

  update(time) {
    if (this.isOver) return;

    this.player.update();
    updateEnemies(this, this.enemies, this.player.sprite);
    this.autoFire(time);
  }

  
  autoFire(time) {
    if (!this.player.canShoot(time)) return;

    const { x, y } = this.player.sprite;
    let closest = null;
    let closestDist = Infinity;

    this.enemies.getChildren().forEach((enemy) => {
      const dist = Phaser.Math.Distance.Between(x, y, enemy.x, enemy.y);
      if (dist < closestDist) {
        closest = enemy;
        closestDist = dist;
      }
    });

    if (!closest) return;
    this.player.lastShot = time;
    spawnBullet(this, this.bullets, this.player.sprite, closest);
    playSound("shoot");
  }

  onBulletHitsEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.hp -= 1;
    playSound("hit");

    if (enemy.hp > 0) {
      
      this.tweens.add({ targets: enemy, alpha: 0.3, duration: 60, yoyo: true });
      return;
    }

    this.score += enemy.points * this.level;
    this.burst(enemy.x, enemy.y, enemy.color);
    playSound("kill");

    if (Math.random() < SETTINGS.pickupChance) {
      spawnPickup(this, this.pickups, enemy.x, enemy.y);
    }

    enemy.destroy();
    this.emitHud();
  }

  onEnemyHitsPlayer(playerSprite, enemy) {
    if (!this.player.takeDamage(this.time.now)) return;

    playSound("hit");
    this.cameras.main.shake(150, 0.01);
    this.burst(enemy.x, enemy.y, enemy.color);
    enemy.destroy();
    this.emitHud();

    if (this.player.isDead) this.endGame();
  }

  onPickup(playerSprite, pickup) {
    pickup.destroy();
    this.player.heal();
    playSound("pickup");
    this.emitHud();
  }

  nextLevel() {
    this.level += 1;
    playSound("level");

    
    const delay = Math.max(
      SETTINGS.minSpawnDelayMs,
      SETTINGS.baseSpawnDelayMs - (this.level - 1) * SETTINGS.spawnDelayStepMs
    );
    this.spawnTimer.reset({
      delay,
      loop: true,
      callback: () => spawnEnemy(this, this.enemies, this.level),
    });

    
    const text = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, `TASO ${this.level}`, {
        fontFamily: "Courier New",
        fontSize: "72px",
        color: "#ffd23f",
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: text,
      y: text.y - 60,
      alpha: 0,
      duration: 1400,
      onComplete: () => text.destroy(),
    });
  }

  endGame() {
    this.isOver = true;
    this.spawnTimer.remove();
    this.physics.pause();
    this.player.sprite.setFillStyle(0x555555);
    playSound("over");

    
    this.time.delayedCall(900, () => {
      gameEvents.emit("gameover", {
        score: this.score,
        level: this.level,
        time: this.elapsed,
      });
    });
  }

  
  burst(x, y, color) {
    for (let i = 0; i < 8; i += 1) {
      const particle = this.add.rectangle(x, y, 8, 8, color);
      const angle = (Math.PI * 2 * i) / 8;
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 50,
        y: y + Math.sin(angle) * 50,
        alpha: 0,
        duration: 350,
        onComplete: () => particle.destroy(),
      });
    }
  }

  
  drawBackground() {
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1a1a44, 1);
    for (let x = 0; x <= GAME_WIDTH; x += 80) grid.lineBetween(x, 0, x, GAME_HEIGHT);
    for (let y = 0; y <= GAME_HEIGHT; y += 80) grid.lineBetween(0, y, GAME_WIDTH, y);
  }

  emitHud() {
    gameEvents.emit("hud", {
      score: this.score,
      health: this.player.health,
      maxHealth: SETTINGS.maxHealth,
      level: this.level,
      time: this.elapsed,
    });
  }
}
