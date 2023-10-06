import { Component } from "../../components/core/Component";
import { Resize } from "../../components/resize/Resize";
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

        this.cardRight.gameObject.container.alpha = 0;
        this.cardLeft.gameObject.container.alpha = 0;
        this.cardUncknow.gameObject.container.alpha = 0;
    }

    async openCard(props: IROOpenCardsCfg) {
        this.cardUncknow.gameObject.container.alpha = 1;

        await Utils.bounceEffect(this.gameObject.scene, this.cardUncknow.gameObject.container, 0.3);
        await Utils.delay(1000);
        await Utils.bounceEffect(this.gameObject.scene, this.cardUncknow.gameObject.container, 0.3);

        this.cardUncknow.gameObject.remove();

        this.cardRight.gameObject.container.alpha = 1;
        this.cardLeft.gameObject.container.alpha = 1;

        await Utils.delay(500);

        const promiceRight: Promise<void> = this.moveCard(this.cardRight.gameObject.container, 120, 1);
        const promiceLeft: Promise<void> = this.moveCard(this.cardLeft.gameObject.container, 120, -1);

        await Promise.all([promiceRight, promiceLeft]);
        await Utils.delay(500);

        this.turnOverCard(this.cardRight.gameObject.container, () => {
            this.cardRight.sprite.sprite.setScale(0.5, 0.5);
            this.cardRight.sprite.onSetTexture(props.textureRight);

            const command: Component = new props.commandRight(
                this.props.context,
                this.cardRight.sprite.sprite
            );

            this.gameObject.addComponent(command);
        });

        this.turnOverCard(this.cardLeft.gameObject.container, () => {
            this.cardLeft.sprite.sprite.setScale(0.5, 0.5);
            this.cardLeft.sprite.onSetTexture(props.textureLeft);

            const command: Component = new props.commandRight(
                this.props.context,
                this.cardLeft.sprite.sprite
            );
            
            this.gameObject.addComponent(command);
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

    private turnOverCard(container: Phaser.GameObjects.Container, changeTexture: () => void) {
        return new Promise<void>((resolve) => {
            const duration: number = 50;
            const scaleX: number = container.scaleX;

            this.gameObject.scene.tweens.add({
                targets: container,
                scaleX: 0,
                duration,
                onComplete: () => {
                    changeTexture();
                    this.gameObject.scene.tweens.add({
                        targets: container,
                        scaleX,
                        duration,
                        onComplete: () => {
                            resolve();
                        },
                    });
                },
            });
        })
    }
}