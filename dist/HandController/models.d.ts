import { SupportedModels, HandDetector } from "@tensorflow-models/hand-pose-detection";
import { LayersModel } from "@tensorflow/tfjs";
export interface TrainingRecords {
    [s: string]: number[][];
}
export declare class HandModels {
    model: SupportedModels;
    detector?: HandDetector;
    poseModel?: LayersModel;
    poseModelName: string;
    poses: string[];
    constructor();
    init(): Promise<void>;
    loadPoses(): string[];
    loadPoseModel(): Promise<void>;
    getPoseLabel: (predictionData: Float32Array) => string;
}
