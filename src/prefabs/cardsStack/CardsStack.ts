import { COMPONENT_EVENTS } from "../../components/core/events";
import { Resize } from "../../components/resize/Resize";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Utils } from "../../utils";
import { CardStack } from "./CardStack";

export class CardsStack {
    gameObject: GameObject;
    cards: CardStack[];
    space: number = 40;
    capacity: number;

    private amount: number;
    private props: IROPrefabCfg;

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
                           relativePosition: { x: 0.4, y: 0.9 },
                           scale: { x: 1, y: 1 },
                        },
                        landscape: {
                            relativePosition: { x: 0.3, y: 0.8 },
                            scale: { x: 0.7, y: 0.7 },
                        },
                    }),
                ],
                context: props.context,
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

            await Utils.bounceEffect(this.gameObject.scene, cardStack.gameObject.container, 0.2);
            await Utils.delay(500);

            this.gameObject.scene.tweens.add({
                targets: cardStack.gameObject.container,
                x: (this.cards.length * this.space) - (this.capacity * this.space) / 2,
                duration,
                onComplete: async () => {
                    await Utils.turnOverCard(this.gameObject.scene, cardStack.gameObject.container, () => {
                        cardStack.spriteCard.onSetTexture(ASSETS_NAME.CardBack);
                    });
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
