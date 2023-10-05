import { COMPONENT_EVENTS } from "../components/core/events";
import { Resize } from "../components/resize/Resize";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { Utils } from "../utils";
import { CardStack } from "./CardStack";

export class CardsStack {
    gameObject: GameObject;
    
    private capacity: number;
    private amount: number;
    private cards: CardStack[];

    private props: IROPrefabCfg;
    private space: number = 40;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsStack",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           relativePosition: { x: 0.5, y: 0.5 },
                        },
                        landscape: {
                            relativePosition: { x: 0.5, y: 0.5 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.CardsStack),
            }
        );

        this.props = props;
        this.capacity = 10;
        this.amount = 4;
        this.cards = [];

        this.fillStack();
    }

    addCard(texture: string) {
        return new Promise<void>(async (resolve) => {
            const duration: number = 100;
            const cardStack: CardStack = this.createCard(this.capacity);

            cardStack.gameObject.container.emit(COMPONENT_EVENTS.SET_TEXTURE, texture);

            await this.addEffect(cardStack);
            await Utils.delay(500);

            this.gameObject.scene.tweens.add({
                targets: cardStack.gameObject.container,
                x: (this.cards.length * this.space) - (this.capacity * this.space) / 2,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    addEffect(cardStack: CardStack) {
        return new Promise<void>(async (resolve) => {
            const duration: number = 100;

            this.gameObject.scene.tweens.add({
                targets: cardStack.gameObject.container,
                scale: cardStack.gameObject.container.scale + 0.2,
                duration,
                yoyo: true,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private createCard(index: number) {
        const cardStack: CardStack = new CardStack({ context: this.props.context });
            
        cardStack.gameObject.container.x = (index * this.space) - (this.capacity * this.space) / 2;

        this.gameObject.container.add(cardStack.gameObject.container);
        this.cards.push(cardStack);

        return cardStack;
    }

    private fillStack() {
        for (let index = 0; index < this.amount; index++) {
            this.createCard(index);
        }
    }
}
