import { IROOrientationCfg, IROResizeCfg } from "../../components/resize/types";

export class CameraManager {
    props: IROResizeCfg;
    camera: Phaser.Cameras.Scene2D.Camera;

    constructor(props: IROResizeCfg) {
        this.props = props;
        this.camera = props.scene.cameras.main;

        this.onCreate();
    }

    onCreate() {
        this.props.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    private onResize() {
        const { innerWidth, innerHeight } = window;
        const isLandscape: boolean = (innerWidth / innerHeight) > 1;
        const orientation: IROOrientationCfg = isLandscape ? this.props.landscape : this.props.portrait;

        if(orientation.absolutePosition) {
            this.camera.setScroll(orientation.absolutePosition.x, orientation.absolutePosition.y);
        }

        if(orientation.relativePosition) {
            this.camera.setScroll(innerWidth * orientation.relativePosition.x, innerHeight * orientation.relativePosition.y);
        }

        if(orientation.scale) {
            this.camera.setZoom(orientation.scale.x, orientation.scale.y);
        }

        if(orientation.size) {
            this.camera.setSize(orientation.size.width, orientation.size.height);
        }

        if(orientation.origin) {
            this.camera.setOrigin(orientation.origin.x, orientation.origin.y);
        }
    }
}