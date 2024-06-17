import React from "react";
import { Camera } from "./Camera";
import { Canvas } from "./Canvas";
import { CustomHand, HandState } from "./hands";
import { HandModels } from "./models";
import { tensor2d, Tensor } from "@tensorflow/tfjs";
import { clickElementByCoordinates } from "./utils";

interface Props {
  onPoseChange?: (pose: string) => void;
  onPinch?: (hand: HandState, x: number, y: number, release?: boolean) => void;
  onDragStart?: (hand: HandState, x: number, y: number) => void;
  onDrag?: (hand: HandState, x: number, y: number) => void;
  onDrop?: (hand: HandState, x: number, y: number) => void;
  showMiniCamera?: boolean;
  passThroughPinchAsClick?: boolean;
}

interface State {
  hands: HandState[];
  poses: string[];
  loaded: boolean;
}

export class HandController extends React.Component<Props, State> {
  state = {
    hands: [],
    poses: [],
    loaded: false,
  };
  cameraWidth = 120;
  cameraHeight = 80;
  canvasWidth = document.body.offsetWidth;
  canvasHeight = document.body.offsetHeight;

  models: HandModels = new HandModels();
  hands: { [s: string]: HandState } = {
    Left: new HandState(),
    Right: new HandState(),
  };

  constructor(props: Props) {
    super(props);
    this.cameraWidth = this.canvasWidth * 0.1;
    this.cameraHeight = this.canvasHeight * 0.1;

    [this.hands.Left, this.hands.Right].forEach((hand) => {
      hand.onPoseChange = this.props.onPoseChange;
      hand.onPinch = this.props.passThroughPinchAsClick
        ? this.onPinch
        : this.props.onPinch;
      hand.onDragStart = this.props.onDragStart;
      hand.onDrag = this.props.onDrag;
      hand.onDrop = this.props.onDrop;
    });
  }

  async componentDidMount() {
    try {
      await this.models.init();
      this.setState({
        poses: this.models.poses,
        loaded: true,
      });
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
            height={this.canvasHeight}
          />
        )}
        <Camera
          onCapture={this.scanVideo}
          frequency={50}
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

  onPinch = (
    hand: HandState,
    x: number,
    y: number,
    isPinched: boolean = true
  ) => {
    if (isPinched) {
      clickElementByCoordinates(x, y, hand.handedness === "Left" ? 0 : 1);
    }
    if (this.props.onPinch) {
      this.props.onPinch(hand, x, y, isPinched);
    }
  };

  scanVideo = (video: HTMLVideoElement) => {
    // detect hands
    this.models.detector
      ?.estimateHands(video, { flipHorizontal: true })
      .then((hands) => {
        // clear pose for invisible hands
        const visibleHands = hands.map((hand) => hand.handedness) as string[];
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
              handState.updateHand(hand as CustomHand);
              return handState;
            })
            .map((hand) => {
              // detect hand pose
              const prediction = this.models.poseModel!.predict(
                tensor2d([hand.serializeHand()])
              ) as Tensor;

              hand.setPose(
                this.models.getPoseLabel(prediction.dataSync() as Float32Array)
              );
              return hand;
            }),
        });
      });
  };
}
