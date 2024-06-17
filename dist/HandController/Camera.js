"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const react_1 = __importDefault(require("react"));
class Camera extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.videoRef = react_1.default.createRef();
        this.onLoaded = () => __awaiter(this, void 0, void 0, function* () {
            if (this.props.onCapture) {
                if (this.videoRef.current) {
                    this.props.onCapture(this.videoRef.current);
                }
                if (!this.props.frequency) {
                    window.requestAnimationFrame(this.onLoaded);
                }
                else {
                    setTimeout(() => {
                        this.onLoaded();
                    }, this.props.frequency);
                }
            }
        });
    }
    shouldComponentUpdate(nextProps) {
        return (nextProps.width !== this.props.width ||
            nextProps.height !== this.props.height ||
            nextProps.onCapture !== this.props.onCapture ||
            nextProps.frequency !== this.props.frequency ||
            nextProps.showMiniCamera !== this.props.showMiniCamera);
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            const constraints = {
                video: true,
            };
            const video = this.videoRef.current;
            const stream = yield navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
            video.addEventListener("loadeddata", this.onLoaded);
        });
    }
    render() {
        // console.log("R: Camera");
        return (react_1.default.createElement("video", { id: "webcam", autoPlay: true, muted: true, width: this.props.width || 640, height: this.props.height || 480, ref: this.videoRef, key: "webcam", style: {
                position: "absolute",
                visibility: this.props.showMiniCamera ? undefined : "hidden",
                left: "0px",
                top: "0px",
                marginTop: "10px",
            } }));
    }
}
exports.Camera = Camera;
