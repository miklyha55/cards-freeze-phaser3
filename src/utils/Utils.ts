import * as Phaser from 'phaser';

import { IVec2 } from "./types";

export namespace Utils {
    export function getWorldPosition(
        target: Phaser.GameObjects.Container
        | Phaser.GameObjects.Sprite
    ) {
        const matrix: Phaser.GameObjects.Components.TransformMatrix = target.getWorldTransformMatrix();
        const position: IVec2 = { x: matrix.getX(0, 0), y: matrix.getY(0, 0) };
        
        return position;
    }

    export function bounceEffect(scene: Phaser.Scene, container: Phaser.GameObjects.Container, deltaScale: number = 0.1) {
        return new Promise<void>(async (resolve) => {
            const duration: number = 100;

            scene.tweens.add({
                targets: container,
                scale: container.scale + deltaScale,
                duration,
                yoyo: true,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }
    
    export function add(vec1: IVec2, vec2: IVec2): IVec2 {
        return {
            x: vec1.x + vec2.x,
            y: vec1.y + vec2.y,
        };
    }

    export function sub(vec1: IVec2, vec2: IVec2): IVec2 {
        return {
            x: vec1.x - vec2.x,
            y: vec1.y - vec2.y,
        };
    }

    export function mul(vec: IVec2, number: number): IVec2 {
        return {
            x: vec.x * number,
            y: vec.y * number,
        };
    }

    export function mag(vec: IVec2): number {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    }

    export function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
