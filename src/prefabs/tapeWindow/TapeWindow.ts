import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";

export class TapeWindow {
    gameObject: GameObject;

    private spriteTapeWindow: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteTapeWindow = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.TapeWindow,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "TapeWindow",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteTapeWindow,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: 15, y: 0 },
                            origin: { x: 0.5, y: 0.5 },
                        },
                        landscape: {
                            absolutePosition: { x: 15, y: 0 },
                            origin: { x: 0.5, y: 0.5 },
                        },
                        parent: this.spriteTapeWindow.sprite,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Enviroment),
            }
        );
    }
}