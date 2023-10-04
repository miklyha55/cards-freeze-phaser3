import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";

export class Character {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const spriteComponent: Sprite = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Character,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Character",
                scene: props.context.scenes.gameScene,
                components: [
                    spriteComponent,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: -200, y: 470 },
                            scale: { x: 0.5, y: 0.5 },
                            origin: { x: 0.5, y: 1 },
                        },
                        landscape: {
                            absolutePosition: { x: -200, y: 470 },
                            scale: { x: 0.5, y: 0.5 },
                            origin: { x: 0.5, y: 1 },
                        },
                        parent: spriteComponent.sprite,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Character),
            }
        );
    }
}