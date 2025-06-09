// filepath: wood-block-jam/wood-block-jam/assets/Script/Block.ts
import { _decorator, Component, Vec3, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Block')
export class Block extends Component {
    @property(Vec3)
    position: Vec3 = new Vec3(0, 0, 0);

    private isDragging: boolean = false;

    start() {
        this.node.setPosition(this.position);
    }

    onTouchStart() {
        this.isDragging = true;
    }

    onTouchMove(touchPosition: Vec3) {
        if (this.isDragging) {
            this.node.setPosition(touchPosition);
        }
    }

    onTouchEnd() {
        this.isDragging = false;
    }
}