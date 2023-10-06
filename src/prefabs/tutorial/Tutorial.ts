import { COMPONENT_EVENTS } from "../../components/core/events";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { TutorialHand } from "./TutorialHand";
import { IROTutorialCfg } from "./types";

export class Tutorial {
    gameObject: GameObject;

    private tutorialHand: TutorialHand;
    private timer: Phaser.Time.TimerEvent;
    private seconds: number;
    private isMove: boolean;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Tutorial",
                scene: props.context.scenes.hudScene,
                components: [],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Tutorial),
            }
        );

        this.tutorialHand = new TutorialHand({ context: props.context });
        this.gameObject.container.add(this.tutorialHand.gameObject.container);

        this.tutorialHand.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false, false);
        
        this.toggleTutorial({
            active: true,
            relativePosition: {
                portrait: {
                    relativePosition: { x: 0, y: 0 },
                    scale: { x: 0.5, y: 0.5 },
                },
                landscape: {
                    relativePosition: { x: 0, y: 0 },
                    scale: { x: 0.5, y: 0.5 },
                },
            },
            absolutePosition: {
                portrait: {
                    absolutePosition: { x: 100, y: 100 },
                },
                landscape: {
                    absolutePosition: { x: 100, y: 100 },
                },
            },
        });
        
    }

    toggleTutorial(props: IROTutorialCfg) {
        if(props.relativePosition) {
            if(props.relativePosition.portrait) {
                this.tutorialHand.relativeResizeTutorialHand.props.portrait
                    = props.relativePosition.portrait;
                this.tutorialHand.relativeResizeTutorialHand.onResize();
            }

            if(props.relativePosition.landscape) {
                this.tutorialHand.relativeResizeTutorialHand.props.landscape
                    = props.relativePosition.landscape;
                this.tutorialHand.relativeResizeTutorialHand.onResize();
            }
        }

        if(props.absolutePosition) {
            if(props.absolutePosition.portrait) {
                this.tutorialHand.render.absoluteResizeTutorialHand.props.portrait
                    = props.absolutePosition.portrait;
                this.tutorialHand.render.absoluteResizeTutorialHand.onResize();
            }

            if(props.absolutePosition.landscape) {
                this.tutorialHand.render.absoluteResizeTutorialHand.props.landscape
                    = props.absolutePosition.landscape;
                this.tutorialHand.render.absoluteResizeTutorialHand.onResize();
            }
        }

        this.tutorialHand.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, props.active);
        this.isMove = props.active;

        if(props.active) {
            this.loopAnimation();
            this.timer?.remove();
        } else {
            if(props.restartSeconds) {
                this.startTimer(props.restartSeconds);
            }
        }
    }

    private startTimer(seconds: number) {
        this.seconds = seconds;
        this.timer = this.gameObject.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.seconds--;

                if(!this.seconds) {
                    this.toggleTutorial({ active: true });
                }
            },
            loop: true,
        });
    }

    private loopAnimation() {
        if(!this.isMove) {
            return;
        }

        const duration: number = 300;

        this.gameObject.scene.tweens.add({
            targets: this.tutorialHand.render.spriteTutorialHand.sprite,
            scale: 2,
            duration,
            yoyo: true,
            onComplete: () => {
                this.loopAnimation();
            },
        });
    }
}