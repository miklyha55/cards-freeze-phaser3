import { Resize } from "../components/resize/Resize";
import { Sprite } from "../components/sprite/Sprite";
import { ASSETS_NAME } from "../configs/assets/Assets";
import { GameObject } from "../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../managers/render/constants";
import { Utils } from "../utils";

export class Character {
    gameObject: GameObject;

    spriteCharacter: Sprite;
    spriteFreeze: Sprite;
    spriteSteam: Sprite;

    freezeAnimationTween: Phaser.Tweens.Tween;
    steamAnimationTween: Phaser.Tweens.Tween;

    constructor(props: IROPrefabCfg) {
        this.spriteCharacter = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Character,
        });

        this.spriteFreeze = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.FreezeEffect,
        });

        this.spriteSteam = new Sprite({
            name: "Sprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.Steam,
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Character",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteCharacter,
                    this.spriteFreeze,
                    this.spriteSteam,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            origin: { x: 0.5, y: 1 },
                        },
                        landscape: {
                            origin: { x: 0.5, y: 1 },
                        },
                        parent: this.spriteCharacter.sprite,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: -30, y: -300 },
                            origin: { x: 0.5, y: 1 },
                        },
                        landscape: {
                            absolutePosition: { x: -30, y: -300 },
                            origin: { x: 0.5, y: 1 },
                        },
                        parent: this.spriteFreeze.sprite,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: 100, y: -820 },
                            scale: { x: 2, y: 2 },
                        },
                        landscape: {
                            absolutePosition: { x: 100, y: -820 },
                            scale: { x: 2, y: 2 },
                        },
                        parent: this.spriteSteam.sprite,
                    }),
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: -200, y: 470 },
                            scale: { x: 0.5, y: 0.5 },
                        },
                        landscape: {
                            absolutePosition: { x: -200, y: 470 },
                            scale: { x: 0.5, y: 0.5 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Character),
            }
        );

        this.freezeAnimationTween = this.freezeAnimation();
        this.steamAnimationTween = this.steamAnimation(false);
    }

    private steamAnimation(active: boolean) {
        return this.gameObject.scene.tweens.add({
            targets: this.spriteSteam.sprite,
            alpha: Number(active),
            duration: 700,
            onComplete: async() => {
                this.steamAnimation(!active);
            }
        });
    }

    private freezeAnimation() {
        this.spriteFreeze.sprite.alpha = 1;

        return this.gameObject.scene.tweens.add({
            targets: this.gameObject.container,
            scaleX: 0.53,
            angle: -3,
            duration: 30,
            yoyo: true,
            loop: 5,
            onComplete: async() => {
                this.spriteFreeze.sprite.alpha = 0;
                await Utils.delay(3000);
                this.freezeAnimation();
            }
        });
    }
}