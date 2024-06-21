import { Hand } from "@tensorflow-models/hand-pose-detection";
export declare enum HAND_POSE {
    Pinch = "pinch",
    Hold = "hold",
    Five = "five"
}
export interface CustomHand extends Hand {
    center: {
        x: number;
        y: number;
    };
    center3d: {
        x: number;
        y: number;
        z: number;
    };
    pose: string;
}
export declare class HandState {
    hand: CustomHand;
    pose: string;
    prevPose: string;
    handedness: string;
    poseBuffer: string[];
    poseBufferLength: number;
    distBuffer: number[];
    distBufferLength: number;
    onPoseChange?: (pose: string, hand?: HandState) => void;
    onPinch?: (hand: HandState, x: number, y: number, isPinched?: boolean) => void;
    onDragStart?: (hand: HandState, x: number, y: number) => void;
    onDrag?: (hand: HandState, x: number, y: number) => void;
    onDrop?: (hand: HandState, x: number, y: number) => void;
    isPinching: boolean;
    isHolding: boolean;
    pinchTrail: {
        x: number;
        y: number;
    }[];
    constructor();
    updateHand(hand: CustomHand): void;
    setPose(pose: string): void;
    pinchPoint: () => {
        x: number;
        y: number;
    };
    scaleHand: (hand: CustomHand) => CustomHand;
    serializeHand: (hand?: CustomHand) => number[];
    serializeHand3D: (hand: CustomHand) => number[];
    distanceToNode3d: (nodeFrom: number, nodeTo: number) => number;
    distanceToCenter3d: (nodeTo: number) => number;
    distanceToNode: (nodeFrom: number, nodeTo: number) => number;
    handTipDirectionAngle: (hand: CustomHand) => number;
}
