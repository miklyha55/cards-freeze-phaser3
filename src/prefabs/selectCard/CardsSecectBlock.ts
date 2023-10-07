import { CardSelectCommand } from "../../components/input/commands/cards/CardSelectCommand";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { CardSelect } from "./CardSelect";
import { IROCardSelectCfg, Indexes } from "./types";

export class CardsSecectBlock {
    gameObject: GameObject;
    sprite: Sprite;
    cards: CardSelect[][];

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
                    texture: ASSETS_NAME.Card3,
                    interractive: {
                        command: CardSelectCommand,
                        commandHandler: () => this.commandHandler.bind(this, [0, 0])(),
                    },
                    resize: {
                        portrait: {
                            absolutePosition: { x: 100, y: 0 },
                        },
                        landscape: {
                            absolutePosition: { x: 100, y: 0 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card2,
                    interractive: {
                        command: CardSelectCommand,
                        commandHandler: () => this.commandHandler.bind(this, [0, 1])(),
                    },
                    resize: {
                        portrait: {
                            absolutePosition: { x: -100, y: 0 },
                        },
                        landscape: {
                            absolutePosition: { x: -100, y: 0 },
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
                            absolutePosition: { x: -300, y: -250 },
                        },
                        landscape: {
                            absolutePosition: { x: -300, y: -250 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card7,
                    resize: {
                        portrait: {
                            absolutePosition: { x: -100, y: -250 },
                        },
                        landscape: {
                            absolutePosition: { x: -100, y: -250 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card6,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 100, y: -250 },
                        },
                        landscape: {
                            absolutePosition: { x: 100, y: -250 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card5,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 300, y: -250 },
                        },
                        landscape: {
                            absolutePosition: { x: 300, y: -250 },
                        },
                    },
                }),
            ],
            [
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card2,
                    resize: {
                        portrait: {
                            absolutePosition: { x: -100, y: -500 },
                        },
                        landscape: {
                            absolutePosition: { x: -100, y: -500 },
                        },
                    },
                }),
                new CardSelect({
                    context: props.context,
                    texture: ASSETS_NAME.Card6,
                    resize: {
                        portrait: {
                            absolutePosition: { x: 100, y: -500 },
                        },
                        landscape: {
                            absolutePosition: { x: 100, y: -500 },
                        },
                    },
                }),
            ],
        ];

        this.cards.forEach(cards => {
            cards.forEach(card => {
                this.gameObject.container.add(card.gameObject.container);
            });
        });
    }

    private commandHandler(indexes: Indexes) {
        this.cards[indexes[0]][indexes[1]].gameObject.remove();
        this.cards[indexes[0]][indexes[1]] = null;

        const rowLength: number = this.cards[indexes[0]].length;
        let counter: number = 0;

        this.cards[indexes[0]].forEach(card => {
            !card && counter++;

            if(counter === rowLength) {
                this.showRow(indexes[0] + 1);
            }
        });
    }

    private showRow(indexRow: number) {
        const cards: CardSelect[] | undefined = this.cards[indexRow];

        if(cards) {
            cards.forEach((card, indexCol) => {
                const props: IROCardSelectCfg = card.props;

                props.interractive = {
                    command: CardSelectCommand,
                    commandHandler: () => this.commandHandler.bind(this, [indexRow, indexCol])(),
                }

                card.setData(props);
            });
        }        
    }
}