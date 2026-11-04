import Phaser from "phaser";
import { SETTINGS } from "../config.js";


export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.health = SETTINGS.maxHealth;
    this.invulnerableUntil = 0;
    this.lastShot = 0;

    const size = SETTINGS.playerSize;
    this.sprite = scene.add.rectangle(x, y, size, size, 0x3b82f6).setStrokeStyle(3, 0xffffff);
    scene.physics.add.existing(this.sprite);
    this.sprite.body.setCollideWorldBounds(true);

    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys("W,A,S,D");
  }

  update() {
    const { left, right, up, down } = this.cursors;
    const { W, A, S, D } = this.wasd;

    const dx = (right.isDown || D.isDown ? 1 : 0) - (left.isDown || A.isDown ? 1 : 0);
    const dy = (down.isDown || S.isDown ? 1 : 0) - (up.isDown || W.isDown ? 1 : 0);

    // Normalisoidaan, ettei vinottain liikkuminen ole nopeampaa
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(SETTINGS.playerSpeed);
    this.sprite.body.setVelocity(dir.x, dir.y);
  }

  canShoot(time) {
    return time - this.lastShot >= SETTINGS.fireDelayMs;
  }

  
  takeDamage(time) {
    if (time < this.invulnerableUntil) return false;
    this.health = Math.max(0, this.health - 1);
    this.invulnerableUntil = time + SETTINGS.invulnerableMs;

    
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0.25,
      duration: 100,
      yoyo: true,
      repeat: 4,
      onComplete: () => this.sprite.setAlpha(1),
    });
    return true;
  }

  heal() {
    this.health = Math.min(SETTINGS.maxHealth, this.health + 1);
  }

  get isDead() {
    return this.health <= 0;
  }
}
