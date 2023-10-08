import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Render } from "./Render";

export class CardsSelect {
    gameObject: GameObject;

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
                           relativePosition: { x: 0.5, y: 0 },
                           scale: { x: 0.4, y: 0.4 },
                        },
                        landscape: {
                            relativePosition: { x: 0.5, y: 0 },
                            scale: { x: 0.27, y: 0.27 },
                        },
                    }),
                ],
                context: props.context,
            }
        );


        const rener: Render = new Render({ context: props.context });

        this.gameObject.container.add(rener.gameObject.container);
    }
}