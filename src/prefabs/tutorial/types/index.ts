import { IOrientationCfg } from "../../../components/resize/types";

export interface IROTutorialCfg {
    readonly active: boolean;
    readonly portrait?: IOrientationCfg;
    readonly landscape?: IOrientationCfg;
}