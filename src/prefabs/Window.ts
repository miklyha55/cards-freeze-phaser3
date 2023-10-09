import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { IVec2 } from "../utils/types";
import { TapeHand } from "./tapeWindow/TapeHand";
import { TapeWindow } from "./tapeWindow/TapeWindow";
import { Utils } from '../utils';

export class Window {
    gameObject: GameObject;

    spriteWindow: Sprite;

    private tapeWindow: TapeWindow;
    private tapeHand: TapeHand;

    private path: IVec2[];

    constructor(props: IROPrefabCfg) {
        this.spriteWindow = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Window,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Window",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteWindow,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            origin: { x: 0.5, y: 0.5 },
                        },
                        landscape: {
                            origin: { x: 0.5, y: 0.5 },
                        },
                        parent: this.spriteWindow.sprite,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: -300, y: -100 },
                            scale: { x: 0.4, y: 0.4 },
                        },
                        landscape: {
                            absolutePosition: { x: -300, y: -100 },
                            scale: { x: 0.4, y: 0.4 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Enviroment),
            }
        );

        this.path = [
            { x: -80, y: -317 },
            { x: 200, y: -230 },
            { x: -110, y: -120 },
            { x: 250, y: -20 },
            { x: -140, y: 220 },
            { x: 230, y: 370 },
            { x: -130, y: 600 },
        ];

        this.tapeWindow = new TapeWindow({context: props.context});
        this.tapeHand = new TapeHand({context: props.context});

        this.gameObject.container.add(this.tapeWindow.gameObject.container);
        this.gameObject.container.add(this.tapeHand.gameObject.container);

        this.tapeHand.gameObject.container.setPosition(this.path[0].x, this.path[0].y);
        this.tapeHand.gameObject.container.alpha = 0;
    }

    async repairAnimation() {
        return new Promise<void>(async (resolve) => {
            this.tapeWindow.gameObject.remove();
            this.spriteWindow.onSetTexture(ASSETS_NAME.WindowRepair);

            await Utils.bounceEffect(this.gameObject.scene, this.gameObject.container, 0.05);
            resolve();
        });
    }

    async tapAnimation() {
        return new Promise<void>((resolve) => {
            this.tapeHand.gameObject.container.alpha = 1;

            this.moveToPath(1, resolve);
        }).then(async () => {
            this.tapeHand.gameObject.container.alpha = 0;

            await Utils.bounceEffect(this.gameObject.scene, this.gameObject.container, 0.05);
        });
    }

    private moveToPath(index: number, resolve: () => void) {
        const position: IVec2 = this.path[index];
        const duration: number = 300;
        
        this.gameObject.scene.tweens.add({
            targets: this.tapeHand.gameObject.container,
            x: position.x,
            y: position.y,
            duration,
            onComplete: () => {
                index++;

                if(index < this.path.length) {
                    this.moveToPath(index, resolve);
                } else {
                    resolve();
                }
            },
            onUpdate: () => {
                this.tapeWindow.moveMask(this.tapeHand.gameObject.container.y - this.path[0].y);
            },
        });
    }
}