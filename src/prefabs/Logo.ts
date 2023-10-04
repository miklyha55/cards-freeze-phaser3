import { UiElementsCommand } from "../components/input/commands/UiElementsCommand";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Logo {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const spriteComponent: Sprite = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.Logo,
            resize: {
                portrait: {
                    origin: { x: 0, y: 0 },
                },
                landscape: {
                    origin: { x: 0, y: 0 },
                }
            }
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Logo",
                scene: props.context.scenes.hudScene,
                components: [
                    spriteComponent,
                    new UiElementsCommand(props.context, spriteComponent.sprite),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        )
    }
}