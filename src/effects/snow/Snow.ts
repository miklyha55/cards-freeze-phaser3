import * as Phaser from 'phaser';
import { ASSETS_NAME } from "../../configs/assets/Assets";

export class Snow {
    constructor(scene: Phaser.Scene) {
        scene.add.particles(0,0, ASSETS_NAME.Snow, {
            scale: { min: 0.1, max: 0.3 },
            x: { min: 0, max: scene.cameras.main.width },
            y: { min: scene.cameras.main.y - scene.cameras.main.height, max: scene.cameras.main.y },
            alpha: 0.3,
            rotate: { start: 0, end: 360 },
            speed: { min: 50, max: 100 },
            lifespan: 6000,
            frequency: 50,
            gravityY: 90,
        });
    }
}