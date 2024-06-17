"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const react_1 = __importDefault(require("react"));
const drawings_1 = require("./drawings");
const DEFAULT_GIZMO_CONFIG = {
    color: "rgba(0, 255, 0, 0.7)",
    size: 10,
    showCenter: true,
    showPose: true,
};
class Canvas extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.canvasRef = react_1.default.createRef();
        this.draw = () => {
            const canvas = this.canvasRef.current;
            const ctx = canvas.getContext("2d");
            const config = Object.assign({}, DEFAULT_GIZMO_CONFIG, this.props.config || {});
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw hands
            this.props.hands.forEach((hand) => {
                ctx.fillStyle = config.color;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                hand.hand.keypoints.forEach((keypoint) => {
                    ctx.fillRect(keypoint.x, keypoint.y, config.size, config.size);
                    ctx.strokeRect(keypoint.x, keypoint.y, config.size, config.size);
                });
                // Draw hand center
                if (config.showCenter) {
                    ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
                    ctx.fillRect(hand.hand.center.x, hand.hand.center.y, 20, 20);
                }
                if (config.showPose) {
                    // Write hand pose
                    ctx.font = "30px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(hand.pose, hand.hand.center.x + 22, hand.hand.center.y + 20);
                    ctx.strokeText(hand.pose, hand.hand.center.x + 22, hand.hand.center.y + 20);
                }
            });
            // Draw circles
            this.props.objects.forEach((object) => {
                if (object.type === drawings_1.DRAW_OBJECT_TYPE.Circle) {
                    ctx.fillStyle = `rgba(${object.color.join(", ")}, ${Math.max(0.01, 1 - Math.min(0.99, object.size / object.endSize))})`;
                    ctx.beginPath();
                    ctx.arc(object.x, object.y, object.size / 2, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fill();
                }
            });
        };
    }
    componentDidMount() {
        this.draw();
    }
    componentDidUpdate() {
        this.draw();
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.hands.length === 0 ? false : true;
    }
    render() {
        // console.log("R: Canvas");
        return (react_1.default.createElement("canvas", { ref: this.canvasRef, width: this.props.width || 640, height: this.props.height || 480, style: {
                position: "absolute",
                left: "0px",
                pointerEvents: "none",
                top: "0px",
                margin: "0px",
            } }));
    }
}
exports.Canvas = Canvas;
