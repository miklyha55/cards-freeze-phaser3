import { IOrientationCfg } from "../../../components/resize/types";

export interface IROTutorialCfg {
    readonly active: boolean;
    readonly relativePosition?: IROTutorialOrientationCfg;
    readonly absolutePosition?: IROTutorialOrientationCfg;
    readonly restartSeconds?: number,
}

export interface IROTutorialOrientationCfg {
    readonly portrait?: IOrientationCfg;
    readonly landscape?: IOrientationCfg;
}