import { Utils } from "../../utils";
import { IVec2 } from "../../utils/types";

export class CameraManager {
    scene: Phaser.Scene;
    camera: Phaser.Cameras.Scene2D.Camera;
    followTarget: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.camera = scene.cameras.main;

        this.onCreate();
    }

    onCreate() {
        this.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    cameraFollowTarget(
        target: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite,
        duration: number = 0,
    ) {
        return new Promise<void>(async (resolve) => {
            const worldPosition: IVec2 = Utils.getWorldPosition(target);
            this.followTarget = target;

            if(duration) {
                this.scene.tweens.add({
                    targets: this.camera,
                    scrollX: worldPosition.x - this.camera.width / 2,
                    scrollY: worldPosition.y - this.camera.height / 2,
                    duration,
                    onComplete: () => {
                        resolve();
                    },
                });
            } else {
                this.camera.scrollX = worldPosition.x - this.camera.width / 2;
                this.camera.scrollY = worldPosition.y - this.camera.height / 2;
            }
        });
    }

    cameraZoom(
        zoom: number,
        duration: number = 0,
    ) {
        return new Promise<void>(async (resolve) => {
            this.scene.tweens.add({
                targets: this.camera,
                zoom,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    cameraBack(duration: number = 0) {
        return new Promise<void>(async (resolve) => {
            this.followTarget = null;

            this.scene.tweens.add({
                targets: this.camera,
                scrollX: 0,
                scrollY: 0,
                zoomX: 1,
                zoomY: 1,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }
    
    private onResize() {
        if(this.followTarget) {
            this.cameraFollowTarget(this.followTarget);
        }
    }
}