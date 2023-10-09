import * as Phaser from 'phaser';

import { COMPONENT_EVENTS } from "../../components/core/events";
import { CardSelectCommand } from "../../components/input/commands/CardSelectCommand";
import { CardRedirectCommand } from "../../components/input/commands/cards/CardRedirectCommand";
import { CardRepairCommand } from "../../components/input/commands/cards/CardRepairCommand";
import { CardTapeCommand } from "../../components/input/commands/cards/CardTapeCommand";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { Utils } from "../../utils";
import { IVec2 } from "../../utils/types";
import { IROOpenCardsCfg } from "../сardsOpen/types";
import { CardSelect } from "./CardSelect";
import { IROCardSelectCfg, Indexes } from "./types";
import { CardUncknow } from './CardUncknow';
import { Component } from '../../components/core/Component';

export class CardsSecectBlock {
    gameObject: GameObject;
    sprite: Sprite;
    cards: CardSelect[][];
    props: IROPrefabCfg;
    openCardProps: IROOpenCardsCfg[];
    openCardCounter: number;
    stepCounter: number;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardsSecectBlock",
                scene: props.context.scenes.hudScene,
                components: [],
                context: props.context,
            }
        );

        this.cards = [
            [
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card4,
                    interractive: {
                        command: CardSelectCommand,
                        commandHandler: () => this.commandHandler.bind(this, [0, 0])(),
                    },
                    resize: {
                        portrait: {
                            absolutePosition: { x: 0, y: 0 },
                        },
                        landscape: {
                            absolutePosition: { x: 0, y: 0 },
                        },
                    },
                }),
            ],
            [
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card5,
                    resize: {
                        portrait: {
                            absolutePosition: { x: -200, y: -150 },
                        },
                        landscape: {
                            absolutePosition: { x: -200, y: -150 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card6,
                    IsUnknow: true,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 0, y: -150 },
                        },
                        landscape: {
                            absolutePosition: { x: 0, y: -150 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card7,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 200, y: -150 },
                        },
                        landscape: {
                            absolutePosition: { x: 200, y: -150 },
                        },
                    },
                }),
            ],
            [
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card8,
                    IsUnknow: true,
                    resize: {
                        portrait: {
                            absolutePosition: { x: -100, y: -300 },
                        },
                        landscape: {
                            absolutePosition: { x: -100, y: -300 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card9,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 100, y: -300 },
                        },
                        landscape: {
                            absolutePosition: { x: 100, y: -300 },
                        },
                    },
                }),
            ],
            [
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card8,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 0, y: -450 },
                        },
                        landscape: {
                            absolutePosition: { x: 0, y: -450 },
                        },
                    },
                }),
            ],
        ];

        this.openCardCounter = 0;
        this.stepCounter = 0;
        
        this.openCardProps = [
            {
                target: props.context.scenes.gameScene.window.gameObject.container,
                textureLeft: ASSETS_NAME.IconTape,
                textureRight: ASSETS_NAME.IconWindow,
                commandLeft: CardTapeCommand,
                commandRight: CardRepairCommand,
            },
            {
                target: props.context.scenes.gameScene.fireplace.spriteFireplace.sprite,
                textureLeft: ASSETS_NAME.IconMatch,
                textureRight: ASSETS_NAME.IconTnt,
                commandLeft: CardRedirectCommand,
                commandRight: CardRedirectCommand,
            },
        ];

        this.props = props;

        const cards: CardSelect[][] = [...this.cards].reverse();

        cards.forEach(cardsRow => {
            cardsRow.forEach(card => {
                this.gameObject.container.add(card.gameObject.container);
            });
        });
    }

    private toggleInputCards(active: boolean) {
        this.cards.forEach(cardsRow => {
            cardsRow.forEach(card => {
                if(!card) {
                    return;
                }

                const input: Component = card.gameObject.getComponentByName("InputCatcher");

                if(input) {
                    input.active = active;
                }
            });
        });
    }

    private async flyCard(container: Phaser.GameObjects.Container, position: IVec2, delay: number = 0) {
        const duration: number = 300;

        delay && await Utils.delay(delay);
        return new Promise<void>((resolve) => {
            this.gameObject.scene.tweens.add({
                targets: container,
                x: position.x,
                y: position.y,
                angle: 360,
                scale: 1.5,
                alpha: 0,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private async commandHandler(indexes: Indexes) {
        this.toggleInputCards(false);

        let isRestartTutorial: boolean = false;
        let restartTutorialCounter: number = 0;

        this.cards[indexes[0]].forEach(card => {
            if(card) {
                restartTutorialCounter++;

                if(restartTutorialCounter > 1) {
                    isRestartTutorial = true;
                }
            }
        });

        this.props.context.scenes.hudScene.tutorial.toggleTutorial({ active: false, restartSeconds: isRestartTutorial ? 1.5 : 0 }); 

        const card: CardSelect = this.cards[indexes[0]][indexes[1]];
        const worldPosition: IVec2 = Utils.getWorldPosition(this.props.context.scenes.hudScene.uiElements.cardsStack.gameObject.container);
        const localPosition: IVec2 = Utils.getLocaldPosition(card.gameObject.container, worldPosition);

        await this.flyCard(card.gameObject.container, {
            x: localPosition.x + card.gameObject.container.x,
            y: localPosition.y,
        });

        card.gameObject.remove();
        await this.props.context.scenes.hudScene.uiElements.cardsStack.addCard(card.props.texture);
        this.cards[indexes[0]][indexes[1]] = null;

        const rowLength: number = this.cards[indexes[0]].length;
        let counter: number = 0;
        let isEmpty: boolean = false;

       this.cards[indexes[0]].forEach(async card => {
            !card && counter++;

            if(counter === rowLength) {
                isEmpty = true;
            }
        });

        if(isEmpty) {
            await this.showRow(indexes[0] + 1);
        }
        
        this.toggleInputCards(true);
    }

    private async showRow(indexRow: number) {
        const cards: CardSelect[] | undefined = this.cards[indexRow];

        if(cards) {
            let cardIsUncknow: CardSelect | null = null;

            cards.forEach(async (card, indexCol) => {
                const props: IROCardSelectCfg = card.props;

                props.interractive = {
                    command: CardSelectCommand,
                    commandHandler: () => this.commandHandler.bind(this, [indexRow, indexCol])(),
                }

                if(card.props.IsUnknow) {
                    cardIsUncknow = card;
                }

                card.setData(props);
            });

            this.toggleInputCards(false);

            if(cardIsUncknow) {
                const cardUncknow: CardUncknow = new CardUncknow({ context: this.props.context });
                    
                cardUncknow.gameObject.container.setPosition(cardIsUncknow.gameObject.container.x, cardIsUncknow.gameObject.container.y);
                cardIsUncknow.gameObject.container.parentContainer.add( cardUncknow.gameObject.container);

                const worldPosition: IVec2= Utils.getWorldPosition(this.props.context.scenes.hudScene.cardsOpen.gameObject.container);
                const localPosition: IVec2 = Utils.getLocaldPosition(cardUncknow.gameObject.container, worldPosition);
        
                await this.flyCard(
                    cardUncknow.gameObject.container,
                    { x: localPosition.x + cardUncknow.gameObject.container.x, y: localPosition.y },
                    400,
                );

                this.props.context.scenes.hudScene.uiElements.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false);

                await this.props.context.scenes.hudScene.cardsOpen.openCard(this.openCardProps[this.openCardCounter]);
                await this.props.context.scenes.gameScene.cameraManager
                    .cameraFollowTarget(
                        this.openCardProps[this.openCardCounter].target,
                        200,
                    );

                this.openCardCounter++;
                this.stepCounter = 0;
            }
        }        
    }
}