
import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { CardsSecectBlock } from "./CardsSecectBlock";

export class Render {
    gameObject: GameObject;
    cardsSelectBlock: CardsSecectBlock;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Render",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           absolutePosition: { x: 670, y: 1200 },
                        },
                        landscape: {
                            absolutePosition: { x: 800, y: 900 },
                        },
                    }),
                ],
                context: props.context,
            }
        );

        this.cardsSelectBlock 
            = new CardsSecectBlock({ context: props.context });

        this.gameObject.container.add(this.cardsSelectBlock.gameObject.container);
    }
}