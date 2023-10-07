import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { CardsSecectBlock } from "./CardsSecectBlock";

export class CardsSelect {
    gameObject: GameObject;
    sprite: Sprite;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsSelect",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           relativePosition: { x: 0.5, y: 0.25 },
                           scale: { x: 0.4, y: 0.4 },
                        },
                        landscape: {
                            relativePosition: { x: 0.5, y: 0.25 },
                            scale: { x: 0.4, y: 0.4 },
                        },
                    }),
                ],
                context: props.context,
            }
        );


        const cardsSelectBlock: CardsSecectBlock 
            = new CardsSecectBlock({ context: props.context });

        this.gameObject.container.add(cardsSelectBlock.gameObject.container);
    }
}