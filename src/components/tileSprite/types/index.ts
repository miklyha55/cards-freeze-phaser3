import { ISize } from "../../../utils/types";
import { IROComponentCfg } from "../../core/types";

export interface IROTileSpriteCfg extends IROComponentCfg {
    readonly texture: string;
    readonly size: ISize;
}
