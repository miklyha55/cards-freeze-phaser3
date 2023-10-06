import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class Render {
    gameObject: GameObject;
    absoluteResizeTutorialHand: Resize;
    spriteTutorialHand: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteTutorialHand = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.Hand,
        });

        this.absoluteResizeTutorialHand = new Resize({
            name: "Resize",
            scene: props.context.scenes.hudScene,
            portrait: {},
            landscape: {},
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Render",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spriteTutorialHand,
                    this.absoluteResizeTutorialHand,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            origin: { x: 0, y: 0 },
                        },
                        landscape: {
                            origin: { x: 0, y: 0 },
                        },
                        parent: this.spriteTutorialHand.sprite,
                    }),
                ],
                context: props.context,
            }
        )
    }
}