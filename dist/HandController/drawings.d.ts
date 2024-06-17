export declare enum DRAW_OBJECT_TYPE {
    Circle = "circle",
    Rectangle = "rectangle"
}
interface DrawObjectBase {
    x: number;
    y: number;
    centerX: number;
    centerY: number;
    startTime: number;
    size: number;
    startSize: number;
    endSize: number;
    lifetime: number;
    active: boolean;
    color: number[];
}
export interface DrawCircleState extends DrawObjectBase {
    type: DRAW_OBJECT_TYPE.Circle;
}
export interface DrawRectangleState extends DrawObjectBase {
    type: DRAW_OBJECT_TYPE.Rectangle;
}
export type DrawObjectState = DrawCircleState | DrawRectangleState;
export declare class CanvasDrawingState {
    objects: DrawObjectState[];
    onUpdate?: (objects: DrawObjectState[]) => void;
    active: boolean;
    constructor();
    init(): void;
    add(object: DrawObjectState): void;
    addRect(x: number, y: number, params?: Partial<DrawObjectBase>): void;
    addBlip(x: number, y: number, params?: Partial<DrawObjectBase>): void;
    process(): void;
}
export {};
