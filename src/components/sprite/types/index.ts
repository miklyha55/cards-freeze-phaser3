import { IROComponentCfg } from "../../core/types";
import { IROOrientationCfg } from "../../resize/types";

export interface IROSpriteCfg extends IROComponentCfg {
    readonly texture: string;
    readonly resize?: IROSpriteResizeCfg;
}

export interface IROSpriteResizeCfg {
    readonly portrait: IROOrientationCfg;
    readonly landscape: IROOrientationCfg;
}
