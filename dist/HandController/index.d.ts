import React from "react";
import { HandGizmoConfig } from "./Canvas";
import { HandState } from "./hands";
import { HandModels } from "./models";
import { CanvasDrawingState, DrawObjectState } from "./drawings";
interface Props {
    onPoseChange?: (pose: string) => void;
    onPinch?: (hand: HandState, x: number, y: number, release?: boolean, element?: Element | null) => void;
    onDragStart?: (hand: HandState, x: number, y: number) => void;
    onDrag?: (hand: HandState, x: number, y: number) => void;
    onDrop?: (hand: HandState, x: number, y: number) => void;
    showMiniCamera?: boolean;
    passThroughPinchAsClick?: boolean;
    showFeedback?: boolean;
    handGizmoConfig?: HandGizmoConfig;
    onHandUpdate?: (hands: HandState[]) => void;
    onModelLoaded?: () => void;
}
interface State {
    hands: HandState[];
    poses: string[];
    loaded: boolean;
    canvasObjects: DrawObjectState[];
}
export declare class HandController extends React.Component<Props, State> {
    state: State;
    cameraWidth: number;
    cameraHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    processing: boolean;
    models: HandModels;
    hands: {
        [s: string]: HandState;
    };
    drawings: CanvasDrawingState;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    render(): React.JSX.Element;
    onDragStart: (_hand: HandState, x: number, y: number) => void;
    onDrag: (_hand: HandState, x: number, y: number) => void;
    onDrop: (_hand: HandState, x: number, y: number) => void;
    onPinch: (hand: HandState, x: number, y: number, isPinched?: boolean) => void;
    scanVideo: (video: HTMLVideoElement) => void;
}
export {};
