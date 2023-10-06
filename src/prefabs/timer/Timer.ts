import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { Render } from "./Render";

export class Timer {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Timer",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           relativePosition: { x: 1, y: 0 },
                           scale: { x: 0.6, y: 0.6 },
                        },
                        landscape: {
                            relativePosition: { x: 1, y: 0 },
                            scale: { x: 0.4, y: 0.4 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );

        const render: Render = new Render({ context: props.context });

        this.gameObject.container.add(render.gameObject.container);
    }
}