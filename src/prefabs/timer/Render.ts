import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { Text } from "../../components/text/Text";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class Render {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        const spriteTimerBack: Sprite = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.TimerBack,
        });

        const textTimerBack: Text = new Text({
            name: "Text",
            scene: props.context.scenes.hudScene,
            text: "00:12",
            size: 80,
            origin: { x: 0.5, y: 0.5 },
            color: "0x000",
            fontFamily: "RubikBold",
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Render",
                scene: props.context.scenes.hudScene,
                components: [
                    spriteTimerBack,
                    textTimerBack,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           absolutePosition: { x: -300, y: 200 },
                        },
                        landscape: {
                            absolutePosition: { x: -300, y: 200 },
                        },
                        parent: spriteTimerBack.sprite,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           absolutePosition: { x: -300, y: 200 },
                        },
                        landscape: {
                            absolutePosition: { x: -300, y: 200 },
                        },
                        parent: textTimerBack.text,
                    }),
                ],
                context: props.context,
            }
        )
    }
}