import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { Toggle } from "../../components/toggle/Toggle";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class TutorialHand {
    gameObject: GameObject;
    resizeTutorialHand: Resize;
    spriteTutorialHand: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteTutorialHand = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.Hand,
        });

        this.resizeTutorialHand = new Resize({
            name: "Resize",
            scene: props.context.scenes.hudScene,
            portrait: {},
            landscape: {},
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Tutorial",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spriteTutorialHand,
                    this.resizeTutorialHand,
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
                    new Toggle({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                    }),
                ],
                context: props.context,
            }
        )
    }
}