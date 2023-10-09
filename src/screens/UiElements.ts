import { Resize } from "../components/resize/Resize";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { CardsStack } from '../prefabs/cardsStack/CardsStack';
import { CardsSelect } from '../prefabs/cardsSelect/CardsSelect';
import { Toggle } from "../components/toggle/Toggle";

export class UiElements {
    gameObject: GameObject;
    cardsStack: CardsStack;
    cardsSelect: CardsSelect;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "UiElements",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        landscape: {
                            relativePosition: { x: 0, y: 0 },
                        },
                        portrait: {
                            relativePosition: { x: 0, y: 0 },
                        }
                    }),
                    new Toggle({
                        name: "Toggle",
                        scene: props.context.scenes.hudScene,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );

        this.cardsStack = new CardsStack({ context: props.context });
        this.cardsSelect = new CardsSelect({ context: props.context });

        this.gameObject.container.add(this.cardsStack.gameObject.container);
        this.gameObject.container.add(this.cardsSelect.gameObject.container);
    }
}