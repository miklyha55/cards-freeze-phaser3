import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class CardStack {
    gameObject: GameObject;
    spriteCard: Sprite;

    constructor(props: IROPrefabCfg) {
        this.spriteCard = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.CardBack,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsStack",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spriteCard,
                ],
                context: props.context,
            }
        )
    }
}