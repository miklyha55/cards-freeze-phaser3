import { InputCatcher } from "../../../InputCatcher";
import { IROCardCommandCfg } from '../types';

export class CardCommand extends InputCatcher {
    constructor(props: IROCardCommandCfg) {
        super({ scene: props.context.scenes.hudScene, context: props.context, parent: props.parent });
    }
}
