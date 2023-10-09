import { COMPONENT_EVENTS } from "../../components/core/events";
import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { TutorialHand } from "./TutorialHand";
import { IROTutorialCfg } from "./types";

export class Tutorial {
    gameObject: GameObject;
    resizeTutorial: Resize;

    private tutorialHand: TutorialHand;
    private timer: Phaser.Time.TimerEvent;
    private isMove: boolean;
    private loopTweenAnimation: Phaser.Tweens.Tween;

    constructor(props: IROPrefabCfg) {
        this.resizeTutorial = new Resize({
            name: "Resize",
            scene: props.context.scenes.hudScene,
            portrait: {},
            landscape: {},
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Tutorial",
                scene: props.context.scenes.hudScene,
                components: [this.resizeTutorial],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Tutorial),
            }
        );

        this.tutorialHand = new TutorialHand({ context: props.context });
        this.gameObject.container.add(this.tutorialHand.gameObject.container);

        this.tutorialHand.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, false, false);
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
        
        this.tutorialHand.render.spriteTutorialHand.sprite.scale = 1;
        this.tutorialHand.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, props.active);
        this.isMove = props.active;

        this.timer?.remove();
        this.loopTweenAnimation?.remove();

        if(props.active) {
            this.loopAnimation();
        } else {
            if(props.restartSeconds) {
                this.startTimer(props.restartSeconds);
            }
        }
    }

    private startTimer(seconds: number) {
        this.timer = this.gameObject.scene.time.addEvent({
            delay: seconds * 1000,
            callback: () => {
                this.toggleTutorial({ active: true });
            },
        });
    }

    private loopAnimation() {
        if(!this.isMove) {
            return;
        }

        const duration: number = 300;

        this.loopTweenAnimation = this.gameObject.scene.tweens.add({
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