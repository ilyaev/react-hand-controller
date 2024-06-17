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
exports.HandController = void 0;
const react_1 = __importDefault(require("react"));
const Camera_1 = require("./Camera");
const Canvas_1 = require("./Canvas");
const hands_1 = require("./hands");
const models_1 = require("./models");
const tfjs_1 = require("@tensorflow/tfjs");
const utils_1 = require("./utils");
const drawings_1 = require("./drawings");
class HandController extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            hands: [],
            poses: [],
            loaded: false,
            canvasObjects: [],
        };
        this.cameraWidth = 120;
        this.cameraHeight = 80;
        this.canvasWidth = document.body.offsetWidth;
        this.canvasHeight = document.body.offsetHeight;
        this.models = new models_1.HandModels();
        this.hands = {
            Left: new hands_1.HandState(),
            Right: new hands_1.HandState(),
        };
        this.drawings = new drawings_1.CanvasDrawingState();
        this.onDragStart = (_hand, x, y) => {
            this.props.showFeedback &&
                this.drawings.addBlip(x, y, { color: [0, 0, 255], lifetime: 200 });
            this.props.onDragStart && this.props.onDragStart(_hand, x, y);
        };
        this.onDrag = (_hand, x, y) => {
            this.props.showFeedback &&
                this.drawings.addBlip(x, y, {
                    color: [0, 255 - Math.random() * 60, 0],
                    lifetime: 1000,
                });
            this.props.onDrag && this.props.onDrag(_hand, x, y);
        };
        this.onDrop = (_hand, x, y) => {
            this.props.showFeedback &&
                this.drawings.addBlip(x, y, { color: [0, 0, 255], lifetime: 200 });
            this.props.onDrop && this.props.onDrop(_hand, x, y);
        };
        this.onPinch = (hand, x, y, isPinched = true) => {
            if (isPinched) {
                this.props.passThroughPinchAsClick &&
                    (0, utils_1.clickElementByCoordinates)(x, y, hand.handedness === "Left" ? 0 : 1);
                this.props.showFeedback &&
                    this.drawings.addBlip(x, y, {
                        lifetime: 200,
                    });
            }
            if (this.props.onPinch) {
                this.props.onPinch(hand, x, y, isPinched);
            }
        };
        this.scanVideo = (video) => {
            var _a;
            // detect hands
            (_a = this.models.detector) === null || _a === void 0 ? void 0 : _a.estimateHands(video, { flipHorizontal: true }).then((hands) => {
                // clear pose for invisible hands
                const visibleHands = hands.map((hand) => hand.handedness);
                Object.keys(this.hands).forEach((hand) => {
                    if (!visibleHands.includes(hand)) {
                        this.hands[hand].setPose("");
                    }
                });
                if (hands.length === 0 && this.state.hands.length === 0) {
                    return;
                }
                this.setState({
                    hands: hands
                        .map((hand) => {
                        const handState = this.hands[hand.handedness];
                        handState.updateHand(hand);
                        return handState;
                    })
                        .map((hand) => {
                        // detect hand pose
                        const prediction = this.models.poseModel.predict((0, tfjs_1.tensor2d)([hand.serializeHand()]));
                        hand.setPose(this.models.getPoseLabel(prediction.dataSync()));
                        return hand;
                    }),
                });
            });
        };
        this.cameraWidth = this.canvasWidth * 0.1;
        this.cameraHeight = this.canvasHeight * 0.1;
        [this.hands.Left, this.hands.Right].forEach((hand) => {
            hand.onPoseChange = this.props.onPoseChange;
            hand.onPinch = this.onPinch;
            hand.onDragStart = this.onDragStart;
            hand.onDrag = this.onDrag;
            hand.onDrop = this.onDrop;
        });
        this.drawings.onUpdate = (objects) => {
            setTimeout(() => {
                this.setState({ canvasObjects: objects });
            }, 0);
        };
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.models.init();
                this.setState({
                    poses: this.models.poses,
                    loaded: true,
                });
            }
            catch (e) {
                this.setState({ poses: [], loaded: true });
            }
        });
    }
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            this.state.hands.length > 0 && (react_1.default.createElement(Canvas_1.Canvas, { key: "CANVAS", hands: this.state.hands, width: this.canvasWidth, objects: this.state.canvasObjects, height: this.canvasHeight, config: this.props.handGizmoConfig })),
            react_1.default.createElement(Camera_1.Camera, { onCapture: this.scanVideo, frequency: 50, key: "CAMERA", width: this.cameraWidth, showMiniCamera: typeof this.props.showMiniCamera === "undefined"
                    ? true
                    : this.props.showMiniCamera, height: this.cameraHeight })));
    }
}
exports.HandController = HandController;
