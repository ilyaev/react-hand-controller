import React from "react";
import { Camera } from "./Camera";
import { Canvas, HandGizmoConfig } from "./Canvas";
import { CustomHand, HandState } from "./hands";
import { HandModels } from "./models";
import { tensor2d, Tensor } from "@tensorflow/tfjs";
import { clickElementByCoordinates, getClickElement } from "./utils";
import { CanvasDrawingState, DrawObjectState } from "./drawings";

interface Props {
  onPoseChange?: (pose: string) => void;
  onPinch?: (
    hand: HandState,
    x: number,
    y: number,
    release?: boolean,
    element?: Element | null
  ) => void;
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

export class HandController extends React.Component<Props, State> {
  state = {
    hands: [],
    poses: [],
    loaded: false,
    canvasObjects: [],
  } as State;
  cameraWidth = 120;
  cameraHeight = 80;
  canvasWidth = document.body.offsetWidth;
  canvasHeight = document.body.offsetHeight;

  processing = false;

  models: HandModels = new HandModels();
  hands: { [s: string]: HandState } = {
    Left: new HandState(),
    Right: new HandState(),
  };

  drawings: CanvasDrawingState = new CanvasDrawingState();

  constructor(props: Props) {
    super(props);
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

  async componentDidMount() {
    try {
      await this.models.init();
      this.setState({
        poses: this.models.poses,
        loaded: true,
      });
      this.props.onModelLoaded && this.props.onModelLoaded();
    } catch (e) {
      this.setState({ poses: [], loaded: true });
    }
  }

  render() {
    return (
      <>
        {this.state.hands.length > 0 && (
          <Canvas
            key={"CANVAS"}
            hands={this.state.hands}
            width={this.canvasWidth}
            objects={this.state.canvasObjects}
            height={this.canvasHeight}
            config={this.props.handGizmoConfig}
          />
        )}
        <Camera
          onCapture={this.scanVideo}
          frequency={
            this.state.hands.length === 0
              ? 100
              : this.state.hands.length === 2
              ? undefined
              : 50
          }
          key={"CAMERA"}
          width={this.cameraWidth}
          showMiniCamera={
            typeof this.props.showMiniCamera === "undefined"
              ? true
              : this.props.showMiniCamera
          }
          height={this.cameraHeight}
        />
      </>
    );
  }

  onDragStart = (_hand: HandState, x: number, y: number) => {
    this.props.showFeedback &&
      this.drawings.addBlip(x, y, { color: [0, 0, 255], lifetime: 200 });
    this.props.onDragStart && this.props.onDragStart(_hand, x, y);
  };

  onDrag = (_hand: HandState, x: number, y: number) => {
    this.props.showFeedback &&
      this.drawings.addBlip(x, y, {
        color: [0, 255 - Math.random() * 60, 0],
        lifetime: 1000,
      });
    this.props.onDrag && this.props.onDrag(_hand, x, y);
  };

  onDrop = (_hand: HandState, x: number, y: number) => {
    this.props.showFeedback &&
      this.drawings.addBlip(x, y, { color: [0, 0, 255], lifetime: 200 });
    this.props.onDrop && this.props.onDrop(_hand, x, y);
  };

  onPinch = (
    hand: HandState,
    x: number,
    y: number,
    isPinched: boolean = true
  ) => {
    if (isPinched) {
      this.props.passThroughPinchAsClick &&
        clickElementByCoordinates(x, y, hand.handedness === "Left" ? 0 : 1);

      this.props.showFeedback &&
        this.drawings.addBlip(x, y, {
          lifetime: 200,
        });
    } else {
      this.props.showFeedback &&
        this.drawings.addBlip(x, y, {
          lifetime: 200,
          color: [0, 0, 255],
        });
    }

    if (this.props.onPinch) {
      this.props.onPinch(hand, x, y, isPinched, getClickElement(x, y));
    }
  };

  scanVideo = (video: HTMLVideoElement) => {
    if (this.processing || !this.models.detector) {
      return;
    }
    // detect hands
    this.processing = true;
    this.models.detector
      ?.estimateHands(video, { flipHorizontal: true })
      .then((hands) => {
        this.processing = false;
        // clear pose for invisible hands
        const visibleHands = hands.map((hand) => hand.handedness) as string[];
        Object.keys(this.hands).forEach((hand) => {
          if (!visibleHands.includes(hand)) {
            this.hands[hand].setPose("");
          }
        });

        if (hands.length === 0 && this.state.hands.length === 0) {
          this.processing = false;
          return;
        }

        this.setState(
          {
            hands: hands
              .map((hand) => {
                const handState = this.hands[hand.handedness];
                handState.updateHand(hand as CustomHand);
                return handState;
              })
              .map((hand) => {
                // detect hand pose
                const prediction = this.models.poseModel!.predict(
                  tensor2d([hand.serializeHand()])
                ) as Tensor;

                hand.setPose(
                  this.models.getPoseLabel(
                    prediction.dataSync() as Float32Array
                  )
                );
                return hand;
              }),
          },
          () => {
            this.props.onHandUpdate &&
              this.props.onHandUpdate(this.state.hands);
          }
        );
        this.processing = false;
      })

      .catch((e) => {
        this.processing = false;
      });
  };
}
