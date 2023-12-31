import { Resize } from "../components/resize/Resize";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { Button } from "../prefabs/uiElements/Button";
import { Logo } from "../prefabs/uiElements/Logo";

export class UiRedirect {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "UiRedirect",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            relativePosition: { x: 0, y: 0 },
                            scale: { x: 1.3, y: 1.3 },
                        },
                        landscape: {
                            relativePosition: { x: 0, y: 0},
                            scale: { x: 0.8, y: 0.8 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );

        const logo: Logo = new Logo({ context: props.context });
        const button: Button = new Button({ context: props.context });

        this.gameObject.container.add(logo.gameObject.container);
        this.gameObject.container.add(button.gameObject.container);
    }
}