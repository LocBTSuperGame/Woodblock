import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {
    @property(Vec3)
    position: Vec3 = new Vec3(0, 0, 0);

    start() {
        this.node.setPosition(this.position);
    }
}