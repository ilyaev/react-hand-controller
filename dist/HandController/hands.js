"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandState = exports.HAND_POSE = void 0;
const utils_1 = require("./utils");
var HAND_POSE;
(function (HAND_POSE) {
    HAND_POSE["Pinch"] = "pinch";
    HAND_POSE["Hold"] = "hold";
    HAND_POSE["Five"] = "five";
})(HAND_POSE || (exports.HAND_POSE = HAND_POSE = {}));
class HandState {
    constructor() {
        this.hand = {};
        this.pose = "";
        this.prevPose = "";
        this.handedness = "";
        this.poseBuffer = [];
        this.poseBufferLength = 10;
        this.isPinching = false;
        this.isHolding = false;
        this.pinchTrail = [];
        this.pinchPoint = () => {
            const tip2d = this.hand.keypoints[8];
            const thumb2d = this.hand.keypoints[4];
            const x = tip2d.x + (thumb2d.x - tip2d.x) / 2;
            const y = tip2d.y + (thumb2d.y - tip2d.y) / 2;
            return { x, y };
        };
        this.scaleHand = (hand) => {
            var _a;
            let allX = 0;
            let allY = 0;
            const res = Object.assign(Object.assign({}, hand), { keypoints: hand.keypoints.map((keypoint) => {
                    allX += keypoint.x;
                    allY += keypoint.y;
                    return Object.assign(Object.assign({}, keypoint), { x: keypoint.x / 0.1, y: keypoint.y / 0.1 });
                }) });
            res.center = {
                x: allX / hand.keypoints.length / 0.1,
                y: allY / hand.keypoints.length / 0.1,
            };
            let all3dX = 0.0;
            let all3dY = 0.0;
            let all3dZ = 0.0;
            (_a = hand.keypoints3D) === null || _a === void 0 ? void 0 : _a.forEach((keypoint) => {
                all3dX += keypoint.x;
                all3dY += keypoint.y;
                all3dZ += keypoint.z;
            });
            res.center3d = {
                x: all3dX / hand.keypoints3D.length,
                y: all3dY / hand.keypoints3D.length,
                z: all3dZ / hand.keypoints3D.length,
            };
            return res;
        };
        this.serializeHand = (hand) => {
            return this.serializeHand3D(hand || this.hand);
        };
        this.serializeHand3D = (hand) => {
            // const center = hand.center3d;
            // const vectors = hand.keypoints3D!.map((kp) => {
            //     return vectorSubtract(
            //         [kp.x, kp.y, kp.z!],
            //         [center.x, center.y, center.z]
            //     );
            // });
            const vectors = hand.keypoints3D.map((kp) => {
                return [kp.x, kp.y, kp.z];
            });
            const vector = vectors.reduce((res, v) => {
                return res.concat(v);
            }, []);
            const max = Math.max(...vector);
            const min = Math.min(...vector);
            const normalized = vector.map((v) => (v - min) / (max - min));
            return normalized;
        };
        this.distanceToNode3d = (nodeFrom, nodeTo) => {
            const hand = this.hand;
            hand.keypoints3D[4].z = hand.keypoints3D[8].z;
            return (0, utils_1.distance3d)(hand.keypoints3D[nodeFrom].x, hand.keypoints3D[nodeFrom].y, hand.keypoints3D[nodeFrom].z, hand.keypoints3D[nodeTo].x, hand.keypoints3D[nodeTo].y, hand.keypoints3D[nodeTo].z);
        };
        this.distanceToCenter3d = (nodeTo) => {
            const hand = this.hand;
            return (0, utils_1.distance3d)(hand.keypoints3D[nodeTo].x, hand.keypoints3D[nodeTo].y, hand.keypoints3D[nodeTo].z, 0, 0, 0);
        };
        this.distanceToNode = (nodeFrom, nodeTo) => {
            const hand = this.hand;
            return (0, utils_1.distance)(hand.keypoints[nodeFrom].x, hand.keypoints[nodeFrom].y, hand.keypoints[nodeTo].x, hand.keypoints[nodeTo].y);
        };
        this.handTipDirectionAngle = (hand) => {
            const angle = (0, utils_1.calculateAngleBetweenLines)(0, 0, 0, 1, 0, 0, hand.keypoints3D[5].x, hand.keypoints3D[5].y, hand.keypoints3D[5].z, hand.keypoints3D[8].x, hand.keypoints3D[8].y, hand.keypoints3D[8].z);
            return angle;
        };
    }
    updateHand(hand) {
        this.hand = this.scaleHand(hand);
        this.handedness = hand.handedness;
        this.pinchTrail = this.pinchTrail.concat([this.pinchPoint()]).splice(-10);
    }
    setPose(pose) {
        if (!pose) {
            this.poseBuffer = [];
            this.pose = "";
            this.hand.pose = "";
            this.prevPose = "";
            return;
        }
        this.poseBuffer = this.poseBuffer
            .concat([pose])
            .slice(-this.poseBufferLength);
        const poses = this.poseBuffer.reduce((res, v) => {
            res[v] = (res[v] || 0) + 1;
            return res;
        }, {});
        const maxNumber = Math.max(...Object.values(poses));
        const maxPose = Object.keys(poses).find((k) => poses[k] === maxNumber ? true : false);
        const newPose = maxPose || pose;
        this.pose = newPose;
        this.hand.pose = newPose;
        if (newPose !== this.prevPose) {
            if (this.onPoseChange) {
                this.onPoseChange(newPose, this);
            }
        }
        let flag = false;
        switch (newPose) {
            case HAND_POSE.Pinch:
                if (this.distanceToNode3d(8, 4) < 0.02) {
                    if (!this.isPinching) {
                        this.isPinching = true;
                        this.pinchTrail = [];
                        flag = true;
                    }
                }
                else {
                    if (this.isPinching) {
                        this.isPinching = false;
                        flag = true;
                    }
                }
                if (flag && this.onPinch) {
                    const pinchPoint = this.pinchPoint();
                    this.onPinch(this, pinchPoint.x, pinchPoint.y, this.isPinching);
                }
                break;
            case HAND_POSE.Hold:
                if (!this.isHolding && this.prevPose === HAND_POSE.Five) {
                    this.isHolding = true;
                    if (this.onDragStart) {
                        this.onDragStart(this, this.hand.center.x, this.hand.center.y);
                    }
                }
                break;
            default:
                break;
        }
        if (this.isPinching && newPose !== HAND_POSE.Pinch) {
            this.isPinching = false;
            if (this.onPinch) {
                const pinchPoint = this.pinchPoint();
                this.onPinch(this, pinchPoint.x, pinchPoint.y, false);
            }
        }
        if (this.isHolding && newPose !== HAND_POSE.Hold) {
            this.isHolding = false;
            if (this.onDrop) {
                this.onDrop(this, this.hand.center.x, this.hand.center.y);
            }
        }
        if (this.isHolding && this.onDrag) {
            this.onDrag(this, this.hand.center.x, this.hand.center.y);
        }
        this.prevPose = newPose;
    }
}
exports.HandState = HandState;
