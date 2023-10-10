import * as Phaser from 'phaser';

export class Glow {
    private tweenGlow: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, outerStrength: number = 10) {
        sprite.preFX.setPadding(outerStrength);

        const fx: Phaser.FX.Glow = sprite.preFX.addGlow();

        this.tweenGlow = scene.tweens.add({
            targets: fx,
            outerStrength,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    }

    stop() {
        this.tweenGlow.remove();
    }
}