import React from "react";
import { HandState } from "./hands";
import { DRAW_OBJECT_TYPE, DrawObjectState } from "./drawings";

const DEFAULT_GIZMO_CONFIG = {
  color: "rgba(0, 255, 0, 0.7)",
  size: 10,
  showCenter: true,
  showPose: true,
};

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
interface State {}

export class Canvas extends React.Component<Props, State> {
  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    return nextProps.hands.length === 0 ? false : true;
  }

  draw = () => {
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const config = Object.assign(
      {},
      DEFAULT_GIZMO_CONFIG,
      this.props.config || {}
    ) as HandGizmoConfig;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw hands
    this.props.hands.forEach((hand) => {
      ctx.fillStyle = config.color!;
      ctx.strokeStyle = "black";
      ctx.lineWidth = 1;
      hand.hand.keypoints.forEach((keypoint) => {
        ctx.fillRect(keypoint.x, keypoint.y, config.size!, config.size!);
        ctx.strokeRect(keypoint.x, keypoint.y, config.size!, config.size!);
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

        ctx.fillText(
          hand.pose,
          hand.hand.center.x + 22,
          hand.hand.center.y + 20
        );
        ctx.strokeText(
          hand.pose,
          hand.hand.center.x + 22,
          hand.hand.center.y + 20
        );
      }
    });

    // Draw circles
    this.props.objects.forEach((object) => {
      if (object.type === DRAW_OBJECT_TYPE.Circle) {
        ctx.fillStyle = `rgba(${object.color.join(", ")}, ${Math.max(
          0.01,
          1 - Math.min(0.99, object.size / object.endSize)
        )})`;
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.size / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  render() {
    // console.log("R: Canvas");
    return (
      <canvas
        ref={this.canvasRef}
        width={this.props.width || 640}
        height={this.props.height || 480}
        style={{
          position: "absolute",
          left: "0px",
          pointerEvents: "none",
          top: "0px",
          margin: "0px",
        }}
      ></canvas>
    );
  }
}
