import { GameObjectManager } from "../../managers/gameObject/GameObjectManager";
import { RenderManager } from "../../managers/render/RenderManager";
import { CameraBox } from "../../prefabs/CameraBox";
import GameScene from "../GameScene";
import HudScene from "../HudScene";

export interface IROContextCfg {
    readonly scenes: IROScenesCfg;
    readonly jsonGame: IROJsonGame;
    readonly renderGameManager: RenderManager;
    readonly renderUiManager: RenderManager;
    readonly gameObjectManager: GameObjectManager;
    readonly cameraBox: CameraBox;
}

export interface IROScenesCfg {
    readonly gameScene: GameScene;
    readonly hudScene: HudScene;
}

export interface IROJsonGame {
}
