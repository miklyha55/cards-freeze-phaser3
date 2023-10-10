import { Resize } from "../../components/resize/Resize";
import { GameObject } from "../../managers/gameObject/GameObject";
import { IROPrefabCfg } from "../../managers/gameObject/types";
import { RENDER_LAYERS_NAME } from "../../managers/render/constants";
import { Render } from "./Render";

export class Bg {
    gameObject: GameObject;

    constructor(props: IROPrefabCfg) {
        this.gameObject = props.context.gameObjectManager.createGameObject(
            {
                name: "Bg",
                scene: props.context.scenes.gameScene,
                components: [
                    new Resize({
                        name: "Resize",
                        scene: props.context.scenes.gameScene,
                        portrait: {
                           scale: { x: 1, y: 1 },
                        },
                        landscape: {
                            scale: { x: 1.2, y: 1 },
                        },
                    }),
                ],
                context: props.context,
                renderLayer: props.context.renderGameManager.getLayerByName(RENDER_LAYERS_NAME.Bg),
            }
        );

        const bgCenter: Render = new Render({ context: props.context });
        const bgTop: Render = new Render({ context: props.context });
        const bgBottom: Render = new Render({ context: props.context });

        const { height } = bgCenter.gameObject.container.getBounds();

        bgTop.gameObject.container.setPosition(0, -height);
        bgTop.gameObject.container.scaleY = -1;

        bgBottom.gameObject.container.setPosition(0, height);
        bgBottom.gameObject.container.scaleY = -1;

        this.gameObject.container.add(bgCenter.gameObject.container);
        this.gameObject.container.add(bgTop.gameObject.container);
        this.gameObject.container.add(bgBottom.gameObject.container);
    }
}