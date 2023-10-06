import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class CardStack {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsStack",
                scene: props.context.scenes.hudScene,
                components: [
                    new Sprite({
                        name: "Sprite",
                        scene: props.context.scenes.gameScene,
                        texture: ASSETS_NAME.CardBack,
                    }),
                ],
                context: props.context,
            }
        )
    }
}