import { Component } from "../../components/core/Component";
import { Resize } from "../../components/resize/Resize";
import { Toggle } from "../../components/toggle/Toggle";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Utils } from "../../utils";
import { CardLeft } from "./CardLeft";
import { CardRight } from "./CardRight";
import { CardUncknow } from "./CardUncknow";
import { IROOpenCardsCfg } from "./types";

export class CardsOpen {
    gameObject: GameObject;

    cardLeft: CardLeft;
    cardRight: CardRight;
    cardUncknow: CardUncknow;
    props: IROPrefabCfg;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsOpen",
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
                    new Toggle({
                        name: "Toggle",
                        scene: props.context.scenes.hudScene,
                    }),
                ],
                context: props.context,
            }
        );

        this.props = props;

        this.cardLeft = new CardLeft({ context: props.context });
        this.cardRight = new CardRight({ context: props.context });
        this.cardUncknow = new CardUncknow({ context: props.context });

        this.gameObject.container.add(this.cardLeft.gameObject.container);
        this.gameObject.container.add(this.cardRight.gameObject.container);
        this.gameObject.container.add(this.cardUncknow.gameObject.container);

        this.resetCards();
    }

    resetCards() {
        this.cardRight.sprite.sprite.setScale(1, 1);
        this.cardLeft.sprite.sprite.setScale(1, 1);

        this.cardRight.gameObject.container.setPosition(0, 0);
        this.cardLeft.gameObject.container.setPosition(0, 0);

        this.cardLeft.sprite.onSetTexture(ASSETS_NAME.CardBack);
        this.cardRight.sprite.onSetTexture(ASSETS_NAME.CardBack);

        this.cardRight.gameObject.container.alpha = 0;
        this.cardLeft.gameObject.container.alpha = 0;
        this.cardUncknow.gameObject.container.alpha = 0;

        this.cardRight.gameObject.getComponentByName("InputCatcher")?.remove();
        this.cardLeft.gameObject.getComponentByName("InputCatcher")?.remove();
    }

    async openCard(props: IROOpenCardsCfg) {
        this.cardUncknow.gameObject.container.alpha = 1;

        await Utils.bounceEffect(this.gameObject.scene, this.cardUncknow.gameObject.container, 0.3);
        await Utils.delay(1000);
        await Utils.bounceEffect(this.gameObject.scene, this.cardUncknow.gameObject.container, 0.3);

        this.cardUncknow.gameObject.container.alpha = 0;

        this.cardRight.gameObject.container.alpha = 1;
        this.cardLeft.gameObject.container.alpha = 1;

        await Utils.delay(500);

        const promiceRight: Promise<void> = this.moveCard(this.cardRight.gameObject.container, 300, 1);
        const promiceLeft: Promise<void> = this.moveCard(this.cardLeft.gameObject.container, 300, -1);

        await Promise.all([promiceRight, promiceLeft]);
        await Utils.delay(500);

        Utils.turnOverCard(this.gameObject.scene, this.cardRight.gameObject.container, () => {
            this.cardRight.sprite.sprite.setScale(0.5, 0.5);
            this.cardRight.sprite.onSetTexture(props.textureRight);

            if(!props.commandRight) {
                return;
            }

            const command: Component = new props.commandRight({
                context: this.props.context,
                parent: this.cardRight.sprite.sprite,
            });

            this.cardRight.gameObject.addComponent(command);
        });

        Utils.turnOverCard(this.gameObject.scene, this.cardLeft.gameObject.container, () => {
            this.cardLeft.sprite.sprite.setScale(0.5, 0.5);
            this.cardLeft.sprite.onSetTexture(props.textureLeft);

            if(!props.commandLeft) {
                return;
            }

            const command: Component = new props.commandLeft({
                context: this.props.context,
                parent: this.cardLeft.sprite.sprite,
            });
            
            this.cardLeft.gameObject.addComponent(command);
        });
    }

    private moveCard(container: Phaser.GameObjects.Container, deltaX: number, directionX: number) {
        return new Promise<void>((resolve) => {
            const duration: number = 100;

            this.gameObject.scene.tweens.add({
                targets: container,
                x: container.x + (deltaX * directionX),
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        })
    }
}