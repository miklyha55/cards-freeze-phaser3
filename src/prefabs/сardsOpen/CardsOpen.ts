import { Component } from "../../components/core/Component";
import { Resize } from "../../components/resize/Resize";
import { Toggle } from "../../components/toggle/Toggle";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { Glow } from "../../effects/glow/Glow";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { Utils } from "../../utils";
import { IROTutorialCfg } from "../tutorial/types";
import { CardLeft } from "./CardLeft";
import { CardRight } from "./CardRight";
import { CardUncknow } from "./CardUncknow";
import { IROOpenCardsCfg } from "./types";

export class CardsOpen {
    gameObject: GameObject;

    private cardLeft: CardLeft;
    private cardRight: CardRight;
    private cardUncknow: CardUncknow;
    private props: IROPrefabCfg;
    private timer: Phaser.Time.TimerEvent;

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
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
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

    hideTutorial() {
        this.timer.remove();
        this.props.context.scenes.hudScene.tutorial.toggleTutorial({ active: false });
    }

    resetCards() {
        this.cardRight.spriteCard.sprite.setScale(1, 1);
        this.cardLeft.spriteCard.sprite.setScale(1, 1);

        this.cardRight.gameObject.container.setPosition(0, 0);
        this.cardLeft.gameObject.container.setPosition(0, 0);

        this.cardLeft.spriteCard.onSetTexture(ASSETS_NAME.CardBack);
        this.cardRight.spriteCard.onSetTexture(ASSETS_NAME.CardBack);

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

        this.showTutorial();

        Utils.turnOverCard(this.gameObject.scene, this.cardRight.gameObject.container, () => {
            this.cardRight.spriteCard.sprite.setScale(0.5, 0.5);
            this.cardRight.spriteCard.onSetTexture(props.textureRight);

            if(!props.commandRight) {
                return;
            }

            const command: Component = new props.commandRight({
                context: this.props.context,
                parent: this.cardRight.spriteCard.sprite,
            });

            this.cardRight.gameObject.addComponent(command);
        });

        Utils.turnOverCard(this.gameObject.scene, this.cardLeft.gameObject.container, () => {
            this.cardLeft.spriteCard.sprite.setScale(0.5, 0.5);
            this.cardLeft.spriteCard.onSetTexture(props.textureLeft);

            if(!props.commandLeft) {
                return;
            }

            const command: Component = new props.commandLeft({
                context: this.props.context,
                parent: this.cardLeft.spriteCard.sprite,
            });
            
            this.cardLeft.gameObject.addComponent(command);
        });
    }

    private showTutorial() {
        this.props.context.scenes.hudScene.tutorial.resizeTutorial.props.portrait = {
            relativePosition: { x: 0.5, y: 0.5 },
            scale: { x: 1, y: 1 },
        }
        
        this.props.context.scenes.hudScene.tutorial.resizeTutorial.props.landscape = {
            relativePosition: { x: 0.5, y: 0.5 },
            scale: { x: 1, y: 1 },
        }

        this.props.context.scenes.hudScene.tutorial.resizeTutorial.onResize();

        const tutorialsCfg: IROTutorialCfg[] = [
            {
                active: true,
                absolutePosition: {
                    portrait: {
                        absolutePosition: { x: 600, y: 200 },
                        scale: { x: 0.5, y: 0.5 },
                     },
                     landscape: {
                        absolutePosition: { x: 600, y: 200 },
                        scale: { x: 0.5, y: 0.5 },
                     },
                },
            },
            {
                active: true,
                absolutePosition: {
                    portrait: {
                        absolutePosition: { x: -600, y: 200 },
                        scale: { x: 0.7, y: 0.7 },
                     },
                     landscape: {
                        absolutePosition: { x: -600, y: 200 },
                        scale: { x: 0.5, y: 0.5 },
                     },
                },
            }
        ];
        const countTutorialCfg: number = 0;

        this.loopShowTutorial(tutorialsCfg, countTutorialCfg);

        if(this.cardLeft.glowEffect) {
            this.cardLeft.glowEffect.stop();
        }

        if(this.cardRight.glowEffect) {
            this.cardRight.glowEffect.stop();
        }

        this.cardLeft.glowEffect = new Glow(this.gameObject.scene, this.cardLeft.spriteCard.sprite, 20);
        this.cardRight.glowEffect = new Glow(this.gameObject.scene, this.cardRight.spriteCard.sprite, 20);
    }

    private loopShowTutorial(tutorialsCfg: IROTutorialCfg[], countTutorialCfg: number) {
        this.props.context.scenes.hudScene.tutorial.toggleTutorial({ active: false });
        this.props.context.scenes.hudScene.tutorial.toggleTutorial(tutorialsCfg[countTutorialCfg]);

        this.timer = this.gameObject.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                countTutorialCfg++;

                if(tutorialsCfg.length === countTutorialCfg) {
                    countTutorialCfg = 0;
                }
                
                this.loopShowTutorial(tutorialsCfg, countTutorialCfg);
            },
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