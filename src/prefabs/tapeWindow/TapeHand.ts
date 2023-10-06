import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";

export class TapeHand {
    gameObject: GameObject;

    private spriteTapeHand: Sprite;
    private spriteTape: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteTapeHand = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Hand,
        });

        this.spriteTape = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Tape,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "TapeHand",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteTape,
                    this.spriteTapeHand,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: 0, y: -60 },
                            scale: { x: 0.7, y: 0.7 },
                            origin: { x: 0.5, y: 1 },
                        },
                        landscape: {
                            absolutePosition: { x: 0, y: -60 },
                            scale: { x: 0.7, y: 0.7 },
                            origin: { x: 0.5, y: 1 },
                        },
                        parent: this.spriteTape.sprite,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Enviroment),
            }
        );
    }
}