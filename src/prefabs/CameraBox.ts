import { Resize } from "../components/resize/Resize";
import { GameObject } from "../managers/gameObject/GameObject";
import { GameObjectManager } from "../managers/gameObject/GameObjectManager";

export class CameraBox {
    gameObject: GameObject;
    resize: Resize;

    constructor(scene: Phaser.Scene, gameObjectManager: GameObjectManager) {
        this.resize = new Resize({
            name: "Resize",
            scene,
            portrait: {
                relativePosition: { x: 0.5, y: 0.5 },
                scale: { x: 1.5, y: 1.5 },
            },
            landscape: {
                relativePosition: { x: 0.5, y: 0.3 },
                scale: { x: 0.9, y: 0.9 },
            },
        });

        this.gameObject = gameObjectManager.createGameObject(
            {
                name: "CameraBox",
                scene,
                components: [this.resize],
                context: null,
            }
        );
    }
}