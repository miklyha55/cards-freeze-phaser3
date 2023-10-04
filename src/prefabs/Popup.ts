import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Popup {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Popup",
                scene: props.context.scenes.hudScene,
                components: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.hudScene,
                        texture: ASSETS_NAME.Popup,
                    }),
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
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );
    }
}