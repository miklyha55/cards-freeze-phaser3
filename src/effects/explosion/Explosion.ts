import * as Phaser from 'phaser';
import { IVec2 } from '../../utils/types';

export class Explosion {
    explosionEffect: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor(scene: Phaser.Scene, texture: string) {
        this.explosionEffect = scene.add.particles(0, 0, texture, {
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.5, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false,
        });
    }

    start(position: IVec2, count: number = 20) {
        this.explosionEffect.explode(count);
        this.explosionEffect.setPosition(position.x, position.y);
    }
}