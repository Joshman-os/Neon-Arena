import { SETTINGS } from "../config.js";


export const spawnBullet = (scene, group, from, target) => {
  const bullet = scene.add.rectangle(from.x, from.y, 10, 10, 0xffd23f);
  group.add(bullet);
  scene.physics.moveToObject(bullet, target, SETTINGS.bulletSpeed);
  scene.time.delayedCall(SETTINGS.bulletLifetimeMs, () => bullet.active && bullet.destroy());
  return bullet;
};
