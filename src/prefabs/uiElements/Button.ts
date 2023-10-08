import { RedirectCommand } from "../../components/input/commands/RedirectCommand";
import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";

export class Button {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const spriteComponent: Sprite = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.Button,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Button",
                scene: props.context.scenes.hudScene,
                components: [
                    spriteComponent,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            absolutePosition: { x: 35, y: 110 },
                            origin: { x: 0, y: 0 },
                            scale: { x: 0.25, y: 0.25 },
                        },
                        landscape: {
                            absolutePosition: { x: 35, y: 110 },
                            origin: { x: 0, y: 0 },
                            scale: { x: 0.25, y: 0.25 },
                        },
                        parent: spriteComponent.sprite,
                    }),
                    new RedirectCommand(props.context, spriteComponent.sprite),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        )
    }
}