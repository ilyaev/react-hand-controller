"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasDrawingState = exports.DRAW_OBJECT_TYPE = void 0;
var DRAW_OBJECT_TYPE;
(function (DRAW_OBJECT_TYPE) {
    DRAW_OBJECT_TYPE["Circle"] = "circle";
    DRAW_OBJECT_TYPE["Rectangle"] = "rectangle";
})(DRAW_OBJECT_TYPE || (exports.DRAW_OBJECT_TYPE = DRAW_OBJECT_TYPE = {}));
class CanvasDrawingState {
    constructor() {
        this.objects = [];
        this.active = true;
        this.objects = [];
        this.process();
    }
    init() {
        this.addRect(500, 500);
    }
    add(object) {
        this.objects.push(object);
    }
    addRect(x, y, params) {
        this.add(Object.assign({
            centerX: x,
            centerY: y,
            x,
            y,
            startTime: Date.now(),
            size: 20,
            startSize: 20,
            active: true,
            lifetime: -1,
            color: [255, 0, 0],
            type: DRAW_OBJECT_TYPE.Circle,
        }, params || {}));
    }
    addBlip(x, y, params) {
        this.add(Object.assign({
            centerX: x + Math.random() * 10 - 5,
            centerY: y + Math.random() * 10 - 5,
            x,
            y,
            startTime: Date.now(),
            size: 20,
            startSize: 20,
            endSize: 300 + (Math.random() * 100 - 50),
            active: true,
            lifetime: 200 + (Math.random() * 500 - 250),
            color: [255, 0, 0],
            type: DRAW_OBJECT_TYPE.Circle,
        }, params || {}));
    }
    process() {
        if (this.objects.length > 0) {
            let flag = false;
            this.objects = [].concat(this.objects
                .map((object) => {
                if (object.lifetime === -1 || !object.endSize) {
                    return object;
                }
                flag = true;
                const r = Object.assign({}, object, {
                    size: object.startSize +
                        ((object.endSize - object.startSize) *
                            (Date.now() - object.startTime)) /
                            object.lifetime,
                    active: object.size < object.endSize,
                });
                return r;
            })
                .filter((object) => object.active));
            if (flag && this.onUpdate) {
                this.onUpdate(this.objects);
            }
        }
        this.active && window.requestAnimationFrame(this.process.bind(this));
    }
}
exports.CanvasDrawingState = CanvasDrawingState;
