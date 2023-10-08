import { IOrientationCfg, IROResizeCfg } from "../../components/resize/types";
import { Utils } from "../../utils";
import { IVec2 } from "../../utils/types";

export class CameraManager {
    props: IROResizeCfg;
    camera: Phaser.Cameras.Scene2D.Camera;

    private isResize: boolean;
    private zoomBack: IVec2;
    private positionBack: IVec2;


    constructor(props: IROResizeCfg) {
        this.props = props;
        this.camera = props.scene.cameras.main;
        this.isResize = true;

        this.onCreate();
    }

    onCreate() {
        this.props.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    cameraFollowTarget(
        target: Phaser.GameObjects.Container | Phaser.GameObjects.Sprite,
        duration: number = 0,
    ) {
        return new Promise<void>(async (resolve) => {
            this.camera.stopFollow();
            const wirldPosition: IVec2 = Utils.getWorldPosition(target);

            this.saveBackProps();

            this.props.scene.tweens.add({
                targets: this.camera,
                scrollX: wirldPosition.x - this.camera.width / 2,
                scrollY: wirldPosition.y - this.camera.height / 2,
                duration,
                onComplete: () => {
                    this.camera.startFollow(target);
                    resolve();
                },
            });
        });
    }

    cameraZoom(
        zoom: number,
        duration: number = 0,
    ) {
        return new Promise<void>(async (resolve) => {
            this.saveBackProps();

            this.props.scene.tweens.add({
                targets: this.camera,
                zoom,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    cameraBack(duration: number = 0) {
        return new Promise<void>(async (resolve) => {
            this.isResize = true;
            this.camera.stopFollow();

            this.props.scene.tweens.add({
                targets: this.camera,
                scrollX: this.positionBack.x,
                scrollY: this.positionBack.y,
                zoomX: this.zoomBack.x,
                zoomY: this.zoomBack.y,
                duration,
                onComplete: () => {
                    resolve();
                },
            });
        });
    }

    private saveBackProps() {
        if(this.isResize) {
            this.isResize = false;
            this.positionBack = { x: this.camera.scrollX, y: this.camera.scrollY };
            this.zoomBack = { x: this.camera.zoomX, y: this.camera.zoomY };
        }
    }

    private onResize() {
        if(!this.isResize) {
            return;
        }

        const { innerWidth, innerHeight } = window;
        const isLandscape: boolean = (innerWidth / innerHeight) > 1;
        const orientation: IOrientationCfg = isLandscape ? this.props.landscape : this.props.portrait;

        if(orientation.relativePosition) {
            this.camera.setScroll(innerWidth * orientation.relativePosition.x, innerHeight * orientation.relativePosition.y);
        }

        if(orientation.scale) {
            this.camera.setZoom(orientation.scale.x, orientation.scale.y);
        }
    }
}