import { Component } from "../../components/core/Component";
import { COMPONENT_EVENTS } from "../../components/core/events";
import { Resize } from "../../components/resize/Resize";
import { Sprite } from "../../components/sprite/Sprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROCardSelectCfg } from "./types";

export class CardSelect {
    gameObject: GameObject;
    spriteCard: Sprite;
    command: Component;
    props: IROCardSelectCfg;

    constructor(props: IROCardSelectCfg) {
        this.spriteCard =  new Sprite({
            name: "Sprite",
            scene: props.context.scenes.hudScene,
            texture: ASSETS_NAME.CardBack,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "CardSelect",
                scene: props.context.scenes.hudScene,
                components: [
                    this.spriteCard,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                            absolutePosition: props.resize.portrait.absolutePosition,
                            relativePosition: props.resize.portrait.relativePosition,
                            scale: props.resize.portrait.scale,
                        },
                        landscape: {
                            absolutePosition: props.resize.landscape.absolutePosition,
                            relativePosition: props.resize.landscape.relativePosition,
                            scale: props.resize.landscape.scale,
                        },
                    }),
                ],
                context: props.context,
            }
        );
        
        this.props = props;
        
        if(props.interractive) {
            this.setData(props);
        }
    }

    setData(props: IROCardSelectCfg) {
        this.command = new props.interractive.command(
            props.context,
            this.spriteCard.sprite,
            props.interractive.commandHandler,
        );

        this.gameObject.addComponent(this.command);

        const duration: number = 50;
        const scaleX: number = this.gameObject.container.scaleX;

        this.gameObject.scene.tweens.add({
            targets: this.gameObject.container,
            scaleX: 0,
            duration,
            onComplete: () => {
                this.gameObject.container.emit(COMPONENT_EVENTS.SET_TEXTURE, props.texture);
                this.gameObject.scene.tweens.add({
                    targets: this.gameObject.container,
                    scaleX: scaleX,
                    duration,
                });
            },
        });
    }
}