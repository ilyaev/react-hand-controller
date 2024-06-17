import React from "react";
import { HandState } from "./hands";
import { DrawObjectState } from "./drawings";
export interface HandGizmoConfig {
    color?: string;
    size?: number;
    showCenter?: boolean;
    showPose?: boolean;
}
interface Props {
    hands: HandState[];
    width?: number;
    height?: number;
    objects: DrawObjectState[];
    config?: HandGizmoConfig;
}
interface State {
}
export declare class Canvas extends React.Component<Props, State> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: Readonly<Props>): boolean;
    draw: () => void;
    render(): React.JSX.Element;
}
export {};
