import { Component } from '../core/Component';
import { COMPONENT_EVENTS } from '../core/events';
import { IROComponentCfg } from '../core/types';

export class Toggle extends Component
{
    constructor(props: IROComponentCfg) {
        super(props);
    }

    override onCreate() {
        this.parent.on(COMPONENT_EVENTS.TOGGLE_ACTIVE, this.onToggle, this);
    }

    override onRemove() {
        this.parent.off(COMPONENT_EVENTS.TOGGLE_ACTIVE, this.onToggle, this);
    }

    onToggle(active: boolean, isTween: boolean = true) {
        if(isTween) {
            const duration: number = 200;

            return new Promise<void>((resolve) => {
                this.scene.tweens.add({
                    targets: this.parent,
                    alpha: Number(active),
                    duration,
                    onComplete: () => {
                        this.parent.active = active;
                        resolve();
                    }
                });
            });
        } else {
            this.parent.alpha = Number(active);
            this.parent.active = active;
        }
    }
}
