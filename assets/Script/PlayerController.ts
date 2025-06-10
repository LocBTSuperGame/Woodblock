import { _decorator, Component, Node, Vec2, EventTouch, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property([Node])
    blocks: Node[] = [];

    private selectedBlock: Node | null = null;
    private touchOffset: Vec2 = new Vec2();

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        const touchPos = event.getUILocation();
        console.log("Touch Start at: ", touchPos);

        const block = this.getBlockAtLocation(touchPos);
        if (block) {
            this.selectedBlock = block;
            const blockPos = block.getComponent(UITransform)?.getBoundingBoxToWorld().center;
            if (blockPos) {
                this.touchOffset.set(blockPos.x - touchPos.x, blockPos.y - touchPos.y);
            }
        }
    }

    onTouchMove(event: EventTouch) {
        if (this.selectedBlock) {
            const pos = event.getUILocation();
            this.selectedBlock.setPosition(pos.x + this.touchOffset.x, pos.y + this.touchOffset.y);
        }
    }

    onTouchEnd(event: EventTouch) {
        this.selectedBlock = null;
    }

    private getBlockAtLocation(location: Vec2): Node | null {
        for (const block of this.blocks) {
            console.log(block.getComponent(UITransform));
            const uiTransform = block.getComponent(UITransform);
            if (!uiTransform) continue;
            const box = uiTransform.getBoundingBoxToWorld();
            if (box.contains(location)) {
                return block;
            }
        }
        return null;
    }
}

// import { _decorator, Component, Node, Vec2, EventTouch, UITransform } from 'cc';
// const { ccclass, property } = _decorator;

// @ccclass('PlayerController')
// export class PlayerController extends Component {
//     @property([Node])
//     blocks: Node[] = [];

//     private selectedBlock: Node | null = null;
//     private touchOffset: Vec2 = new Vec2();

//     start() {
//         this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
//         this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
//         this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
//     }

//     onTouchStart(event: EventTouch) {
//         const touchPos = event.getUILocation();
//         const block = this.getBlockAtLocation(touchPos);
//         if (block) {
//             this.selectedBlock = block;
//             const blockPos = block.getComponent(UITransform)?.getBoundingBoxToWorld().getCenter();
//             if (blockPos) {
//                 this.touchOffset.set(blockPos.x - touchPos.x, blockPos.y - touchPos.y);
//             }
//         }
//     }

//     onTouchMove(event: EventTouch) {
//         if (this.selectedBlock) {
//             const pos = event.getUILocation();
//             // Thêm offset để tránh bị lệch
//             this.selectedBlock.setPosition(pos.x + this.touchOffset.x, pos.y + this.touchOffset.y);
//         }
//     }

//     onTouchEnd(event: EventTouch) {
//         this.selectedBlock = null;
//     }

//     private getBlockAtLocation(location: Vec2): Node | null {
//         for (const block of this.blocks) {
//             const uiTransform = block.getComponent(UITransform);
//             if (!uiTransform) continue;
//             const box = uiTransform.getBoundingBoxToWorld();
//             if (box.contains(location)) {
//                 return block;
//             }
//         }
//         return null;
//     }
// }




// import { _decorator, Component, Node, Vec3, EventTouch, Camera, geometry, PhysicsSystem, input, Input } from 'cc';
// const { ccclass, property } = _decorator;

// @ccclass('PlayerController')
// export class PlayerController extends Component {
//     @property({ type: Camera })
//     mainCamera: Camera = null!;

//     private selectedBlock: Node | null = null;
//     private offset = new Vec3();

//     start() {
//         input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
//         input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
//         input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
//     }

//     onTouchStart(event: EventTouch) {
//         console.log("Touch Start at: ", event.getLocation());
//         const x = event.getLocationX();
//         const y = event.getLocationY();
//         const ray = new geometry.Ray();
//         this.mainCamera.screenPointToRay(x, y, ray);

//         if (PhysicsSystem.instance.raycastClosest(ray)) {
//             const hit = PhysicsSystem.instance.raycastClosestResult;
//             const collider = hit.collider;
//             console.log("Raycast hit:", collider);
//             if (collider) {
//                 console.log(collider.node.name)
//                 this.selectedBlock = collider.node;
//                 const worldPos = this.selectedBlock.getWorldPosition();
//                 const touchWorld = this.mainCamera.screenToWorld(new Vec3(x, y, worldPos.z));
//                 Vec3.subtract(this.offset, worldPos, touchWorld);
//             }
//         }
//     }

//     onTouchMove(event: EventTouch) {
//         if (!this.selectedBlock) return;
//         const x = event.getLocationX();
//         const y = event.getLocationY();
//         const worldPos = this.mainCamera.screenToWorld(new Vec3(x, y, this.selectedBlock.worldPosition.z));
//         this.selectedBlock.setWorldPosition(worldPos.add(this.offset));
//     }

//     onTouchEnd(event: EventTouch) {
//         this.selectedBlock = null;
//     }
// }
