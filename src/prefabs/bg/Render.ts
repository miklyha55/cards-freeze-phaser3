import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";

export class Render {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Render",
                scene: props.context.scenes.gameScene,
                components: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.gameScene,
                        texture: ASSETS_NAME.Bg,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Bg),
            }
        );
    }
}