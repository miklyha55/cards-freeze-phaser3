import { RedirectCommand } from "../components/input/commands/RedirectCommand";
import { Resize } from "../components/resize/Resize";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Redirect {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Redirect",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            size: { width: 5000, height: 5000 },
                        },
                        landscape: {
                            size: { width: 5000, height: 5000 },
                        },
                    }),
                    new RedirectCommand(props.context),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );
    }
}