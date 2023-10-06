import { CardCommand } from "../../../components/input/commands/cards/core/CardCommand";

export interface IROOpenCardsCfg {
    textureLeft: string;
    textureRight: string;

    commandLeft: typeof CardCommand;
    commandRight: typeof CardCommand;
}