import { ISize, IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROResizeCfg extends IROComponentCfg {
    readonly landscape: IROOrientationCfg;
    readonly portrait: IROOrientationCfg;
}

export interface IROOrientationCfg {
    readonly relativePosition?: IVec2;
    readonly absolutePosition?: IVec2;
    readonly scale?: IVec2;
    readonly size?: ISize;
    readonly origin?: IVec2;
}
