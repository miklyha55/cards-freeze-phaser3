import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { Toggle } from "../components/toggle/Toggle";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { Shadow } from "../prefabs/Shadow";

export class Popup {
    gameObject: GameObject;
    
    private spritePopup: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spritePopup = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.Popup,
        }),

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Popup",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spritePopup,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            relativePosition: { x: 0.5, y: 0.5 },
                            scale: { x: 0.7, y: 0.7 },
                        },
                        landscape: {
                            relativePosition: { x: 0.5, y: 0.5 },
                            scale: { x: 0.5, y: 0.5 },
                        },
                    }),
                    new Toggle({
                        name: "Toggle",
                        scene: props.context.scenes.hudScene,
                    })
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );

        const shadow: Shadow = new Shadow({ context: props.context });

        this.gameObject.container.addAt(shadow.gameObject.container, 0);
    }

    showEffect() {
        return new Promise<void>((resolve) => {
            this.gameObject.scene.tweens.add({
                targets: this.spritePopup.sprite,
                scale: 1.5,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    resolve();
                }
            });
        });
    }

    hideEffect() {
        return new Promise<void>((resolve) => {
            this.gameObject.scene.tweens.add({
                targets: this.spritePopup.sprite,
                scale: 2,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    resolve();
                }
            });
        });
    }
}