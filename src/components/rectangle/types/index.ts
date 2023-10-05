import { ISize, IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IRORectangleCfg extends IROComponentCfg {
    readonly fillColor: number;
    readonly fillAlpha: number;
    readonly size: ISize;
    readonly position: IVec2;
}
