import * as Phaser from 'phaser';

import { Component } from '../../components/core/Component';
import { IROGameObjectCfg } from './types';
import { IROContextCfg } from '../../scenes/types';

export class GameObject {
    name: string;
    index: number;
    components: Array<Component>;
    container: Phaser.GameObjects.Container;

    private scene: Phaser.Scene;
    private renderLayer: Phaser.GameObjects.Container | null;

    protected context: IROContextCfg;

    constructor(props: IROGameObjectCfg) {
        this.name = props.name;
        this.scene = props.scene;
        this.components = props.components;
        this.renderLayer = props.renderLayer;
        this.context = props.context;

        this.container = this.scene.add.container(0, 0);

        this.components.forEach(component => {
            if(component.container.list.length) {
                this.container.add(component.container);
            }
            
            this.constractComponent(component);
        });

        this.renderLayer?.add(this.container);
    }

    removeComponentByName(name: string) {
        this.components?.forEach((component, index) => {
            if(component.name === name) {
                component.remove();
                this.components.splice(index, 1);
            }
        });
    }

    getComponentByName(name: string): Component {
        return this.components?.find((component) => component.name === name);
    }

    getComponentsByName(name: string): Component[] {
        return this.components?.filter((component) => component.name === name);
    }

    addComponent(component: Component) {
        this.components.push(component);
        this.constractComponent(component);
    }

    remove() {}
    onRemove() {}

    private constractComponent(component: Component) {
        if(!component.parent) {
            component.parent = this.container;
        }

        component.remove = () => {
            component.onRemove();
            component.container.destroy();

            this.components.forEach((componentCompare, index) => {
                if(componentCompare === component) {
                    this.components.splice(index, 1);
                }
            })
        }

        component.onCreate();
    }
}
