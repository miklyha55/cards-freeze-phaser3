import { Resize } from "../../components/resize/Resize";
import { TileSprite } from "../../components/tileSprite/TileSprite";
import { ASSETS_NAME } from "../../configs/assets/Assets";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";


export class TapeWindow {
    gameObject: GameObject;

    private spriteTapeWindow: TileSprite;
    private spriteHeight: number;

    constructor(props: IROPrefabCfg) {
        this.spriteTapeWindow = new TileSprite({
            name: "TileSprite",
            scene: props.context.scenes.gameScene,
            texture: ASSETS_NAME.TapeWindow,
            size: {
                width: 436,
                height: 917,
            }
        });

        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "TapeWindow",
                scene: props.context.scenes.gameScene,
                components: [
                    this.spriteTapeWindow,
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                            absolutePosition: { x: 15, y: -917 },
                        },
                        landscape: {
                            absolutePosition: { x: 15, y: -917 },
                        },
                        parent: this.spriteTapeWindow.sprite,
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Enviroment),
            }
        );

        this.spriteTapeWindow.sprite.setTilePosition(0, 0);
        this.spriteHeight = 0;
    }

    moveMask(pathY: number) {
        this.spriteHeight = pathY;
        this.spriteTapeWindow.sprite.y = pathY - this.spriteTapeWindow.sprite.height;
        this.spriteTapeWindow.sprite.setTilePosition(0, this.spriteHeight);
    }
}