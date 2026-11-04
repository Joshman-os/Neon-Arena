import { SETTINGS } from "../config.js";

export const spawnPickup = (scene, group, x, y) => {
  const pickup = scene.add.rectangle(x, y, 22, 22, 0x39ff88).setStrokeStyle(3, 0xffffff);
  group.add(pickup);
  pickup.body.setImmovable(true);

  scene.tweens.add({
    targets: pickup,
    scale: 1.3,
    duration: 350,
    yoyo: true,
    repeat: -1,
  });

  scene.time.delayedCall(SETTINGS.pickupLifetimeMs, () => pickup.active && pickup.destroy());
  return pickup;
};
