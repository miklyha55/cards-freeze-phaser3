import { Component } from '../core/Component';
import { IROOrientationCfg, IROResizeCfg } from './types';

export class Resize extends Component
{
    private readonly props: IROResizeCfg;

    constructor(props: IROResizeCfg) {
        super(props);
        
        this.props = props;
    }

    override onCreate() {
        this.scene.scale.on('resize', this.onResize, this);

        this.onResize();
    }

    private onResize() {
        const { innerWidth, innerHeight } = window;
        const isLandscape: boolean = (innerWidth / innerHeight) > 1;
        const orientation: IROOrientationCfg = isLandscape ? this.props.landscape : this.props.portrait;

        orientation.absolutePosition && this.parent.setPosition(orientation.absolutePosition.x, orientation.absolutePosition.y);
        orientation.relativePosition &&
            this.parent.setPosition(innerWidth * orientation.relativePosition.x, innerHeight * orientation.relativePosition.y);
        orientation.scale && this.parent.setScale(orientation.scale.x, orientation.scale.y);
        orientation.size && this.parent.setSize(orientation.size.width, orientation.size.height);
    }
}
