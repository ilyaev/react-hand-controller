import {
  createDetector,
  SupportedModels,
  HandDetector,
} from "@tensorflow-models/hand-pose-detection";
import { loadLayersModel, LayersModel } from "@tensorflow/tfjs";
import { initDefaultModel } from "./default_model";

export interface TrainingRecords {
  [s: string]: number[][];
}

export class HandModels {
  model = SupportedModels.MediaPipeHands;
  detector?: HandDetector;
  poseModel?: LayersModel;
  poseModelName = "handsModel";
  poses: string[] = [];

  constructor() {}

  async init() {
    this.poses = this.loadPoses();
    await this.loadPoseModel();
    this.detector = await createDetector(this.model, {
      runtime: "tfjs",
    });
  }

  loadPoses() {
    const key = `tensorflowjs_models/${this.poseModelName}/poses`;
    let res = [] as string[];
    try {
      res = JSON.parse(localStorage.getItem(key) || "[]");
    } catch (e) {
      res = [];
    }
    return res;
  }

  async loadPoseModel() {
    if (!this.poses || !this.poses.length) {
      initDefaultModel(this.poseModelName);
      this.poses = this.loadPoses();
    }
    try {
      this.poseModel = await loadLayersModel(
        `localstorage://${this.poseModelName}`
      );
    } catch (e) {
      this.poseModel = undefined;
    }
  }

  getPoseLabel = (predictionData: Float32Array) => {
    const mv = Math.max(...predictionData);
    if (mv > 0.6) {
      return this.poses[predictionData.findIndex((v) => v === mv)];
    }
    return "Unknown";
  };
}
