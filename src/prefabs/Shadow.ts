import { Rectangle } from "../components/rectangle/Rectangle";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Shadow {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Shadow",
                scene: props.context.scenes.hudScene,
                components: [
                    new Rectangle({
                        name: "Rectangle",
                        scene: props.context.scenes.hudScene,
                        fillColor: 0x000,
                        fillAlpha: 0.5,
                        size: { width: 5000, height: 5000 },
                        position: { x:0, y: 0 },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        )
    }
}