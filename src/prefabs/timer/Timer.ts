import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { Render } from "./Render";
import { IROTimerCfg } from "./types";

export class Timer {
    gameObject: GameObject;

    private minutes: number;
    private seconds: number;

    private timer: Phaser.Time.TimerEvent;
    private isStop: boolean;
    private render: Render;

    constructor(props: IROTimerCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Timer",
                scene: props.context.scenes.hudScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.hudScene,
                        portrait: {
                           relativePosition: { x: 1, y: 0 },
                           scale: { x: 0.6, y: 0.6 },
                        },
                        landscape: {
                            relativePosition: { x: 1, y: 0 },
                            scale: { x: 0.4, y: 0.4 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderUiManager.getLayerByName(RENDER_LAYERS_NAME.UiElements),
            }
        );

        this.render = new Render({ context: props.context });

        this.gameObject.container.add(this.render.gameObject.container);

        this.minutes = props.minutes;
        this.seconds = props.seconds;

        this.isStop = false;

        this.startTimer();
    }

    toggleTimer(active: boolean) {
       this.isStop = active;
    }

    private startTimer() {
        this.updateView();
        
        this.timer = this.gameObject.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if(this.isStop || !this.seconds && !this.minutes) {
                    return;
                }

                this.updateView();

                if(!this.seconds) {
                    if(!this.minutes) {
                        this.timer.remove();
                    }
                    this.seconds = 60;
                    this.minutes--;
                }

                this.seconds--;
            },
            loop: true,
        });
    }

    private updateView() {
        const zeroSeconds: string = this.seconds < 10 ? "0" : "";
        const zeroMinutes: string = this.minutes < 10 ? "0" : "";

        this.render.textTimer.text.setText(`${zeroMinutes + this.minutes}:${zeroSeconds + this.seconds}`);
    }
}