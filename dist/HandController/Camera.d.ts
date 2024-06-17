import React from "react";
interface Props {
    width?: number;
    height?: number;
    showMiniCamera?: boolean;
    onCapture?: (video: HTMLVideoElement) => void;
    frequency?: number;
}
interface State {
}
export declare class Camera extends React.Component<Props, State> {
    videoRef: React.RefObject<HTMLVideoElement>;
    shouldComponentUpdate(nextProps: Readonly<Props>): boolean;
    componentDidMount(): Promise<void>;
    onLoaded: () => Promise<void>;
    render(): React.JSX.Element;
}
export {};
