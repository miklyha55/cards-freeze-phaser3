import { IVec2 } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROTextCfg extends IROComponentCfg {
    readonly text: string;
    readonly size: number;
    readonly position?: IVec2;
    readonly origin?: IVec2;
    readonly color?: string;
    readonly fontFamily?: string;
}
