// filepath: /wood-block-jam/wood-block-jam/assets/Script/PlayerController.ts
import { _decorator, Component, Node, Vec3, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private selectedBlock: Node | null = null;

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        const touchLocation = event.getLocation();
        const block = this.getBlockAtLocation(touchLocation);
        if (block) {
            this.selectedBlock = block;
        }
    }

    onTouchMove(event: EventTouch) {
        if (this.selectedBlock) {
            const touchLocation = event.getLocation();
            this.selectedBlock.setPosition(new Vec3(touchLocation.x, touchLocation.y, this.selectedBlock.position.z));
        }
    }

    onTouchEnd(event: EventTouch) {
        this.selectedBlock = null;
    }

    private getBlockAtLocation(location: Vec3): Node | null {
        // Implement logic to determine if a block is at the given location
        // This is a placeholder for the actual implementation
        return null;
    }
}