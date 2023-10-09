import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Render } from "./Render";

export class CardsSelect {
    gameObject: GameObject;
    props: IROPrefabCfg;

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
        this.props = props;
    }

    showTutorial() {
        this.props.context.scenes.hudScene.tutorial.resizeTutorial.props.portrait = {
            relativePosition: { x: 0.5, y: 0 },
            scale: { x: 0.4, y: 0.4 },
        }
        
        this.props.context.scenes.hudScene.tutorial.resizeTutorial.props.landscape = {
            relativePosition: { x: 0.5, y: 0 },
            scale: { x: 0.27, y: 0.27 },
        }

        this.props.context.scenes.hudScene.tutorial.resizeTutorial.onResize();

        this.props.context.scenes.hudScene.tutorial.toggleTutorial({
            active: true,
            absolutePosition: {
                portrait: {
                    absolutePosition: { x: 1500, y: 2500 },
                    scale: { x: 1.5, y: 1.5 },
                 },
                 landscape: {
                     absolutePosition: { x: 1800, y: 1900 },
                     scale: { x: 1.5, y: 1.5 },
                 },
            },
        });
    }
}