import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class CardRight {
    gameObject: GameObject;
    sprite: Sprite;

    constructor(props: IROPrefabCfg) {
        this.sprite =  new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.CardBack,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardRight",
                scene: props.context.scenes.hudScene,
                components: [
                    this.sprite,
                ],
                context: props.context,
            }
        )
    }
}