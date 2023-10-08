import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Fireplace {
    gameObject: GameObject;
    spriteFireplace: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteFireplace = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Fireplace,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Fireplace",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteFireplace,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: 150, y: 380 },
                            scale: { x: 0.55, y: 0.55 },
                            origin: { x: 0.5, y: 1 },
                        },
                        landscape: {
                            absolutePosition: { x: 150, y: 380 },
                            scale: { x: 0.55, y: 0.55 },
                            origin: { x: 0.5, y: 1 },
                        },
                        parent: this.spriteFireplace.sprite,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Enviroment),
            }
        );
    }
}