import { Resize } from "../../components/resize/Resize";
import { Toggle } from "../../components/toggle/Toggle";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Render } from "./Render";

export class TutorialHand {
    gameObject: GameObject;
    relativeResizeTutorialHand: Resize;
    render: Render;

    constructor(props: IROPrefabCfg) {
        this.relativeResizeTutorialHand = new Resize({
            name: "Resize",
            scene: props.context.scenes.hudScene,
            portrait: {
                scale: {x: 0.5, y: 0.5 },
            },
            landscape: {
                scale: {x: 0.5, y: 0.5 },
            },
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "TutorialHand",
                scene: props.context.scenes.hudScene,
                components: [
                    this.relativeResizeTutorialHand,
                    new Toggle({
                        name: "Toggle",
                        scene: props.context.scenes.hudScene,
                    }),
                ],
                context: props.context,
            }
        );

        this.render = new Render({ context: props.context });
        this.gameObject.container.add(this.render.gameObject.container);
    }
}