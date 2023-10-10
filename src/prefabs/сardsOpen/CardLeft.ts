import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { Glow } from "../../effects/glow/Glow";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";

export class CardLeft {
    gameObject: GameObject;
    spriteCard: Sprite;
    glowEffect: Glow;

    constructor(props: IROPrefabCfg) {
        this.spriteCard =  new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.CardBack,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardLeft",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spriteCard,
                ],
                context: props.context,
            }
        )
    }
}