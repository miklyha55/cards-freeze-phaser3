import { COMPONENT_EVENTS } from "../../components/core/events";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { TutorialHand } from "./TutorialHand";
import { IROTutorialCfg } from "./types";

export class Tutorial {
    gameObject: GameObject;

    private tutorialHand: TutorialHand;
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
            portrait: {
                scale: { x: 0.3, y: 0.3 },
            },
            landscape: {
                scale: { x: 0.3, y: 0.3 },
            },
        });
    }

    toggleTutorial(props: IROTutorialCfg) {
        if(props.portrait) {
            this.tutorialHand.resizeTutorialHand.props.portrait = props.portrait;
            this.tutorialHand.resizeTutorialHand.onResize();
        }

        if(props.landscape) {
            this.tutorialHand.resizeTutorialHand.props.landscape = props.landscape;
            this.tutorialHand.resizeTutorialHand.onResize();
        }

        this.tutorialHand.gameObject.container.emit(COMPONENT_EVENTS.TOGGLE_ACTIVE, props.active);
        this.isMove = props.active;

        if(props.active) {
            this.loopAnimation();
        }
    }

    private loopAnimation() {
        if(!this.isMove) {
            return;
        }

        const duration: number = 300;

        this.gameObject.scene.tweens.add({
            targets: this.tutorialHand.spriteTutorialHand.sprite,
            scale: 2,
            duration,
            yoyo: true,
            onComplete: () => {
                this.loopAnimation();
            },
        });
    }
}