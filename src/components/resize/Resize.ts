import { Component } from '../core/Component';
import { IOrientationCfg, IROResizeCfg } from './types';

export class Resize extends Component
{
    props: IROResizeCfg;

    constructor(props: IROResizeCfg) {
        super(props);

        if(props.parent) {
            this.parent = props.parent;
        }
        
        this.props = props;
    }

    override onCreate() {
        this.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    onResize() {
        const { innerWidth, innerHeight } = window;
        const isLandscape: boolean = (innerWidth / innerHeight) > 1;
        const orientation: IOrientationCfg = isLandscape ? this.props.landscape : this.props.portrait;

        if(orientation.absolutePosition) {
            this.parent.setPosition(orientation.absolutePosition.x, orientation.absolutePosition.y);
        }

        if(orientation.relativePosition) {
            this.parent.setPosition(innerWidth * orientation.relativePosition.x, innerHeight * orientation.relativePosition.y);
        }

        if(orientation.scale) {
            this.parent.setScale(orientation.scale.x, orientation.scale.y);
        }

        if(orientation.size) {
            this.parent.setSize(orientation.size.width, orientation.size.height);
        }

        if(orientation.origin) {
            (this.parent as Phaser.GameObjects.Sprite).setOrigin(orientation.origin.x, orientation.origin.y);
        }
    }
}
