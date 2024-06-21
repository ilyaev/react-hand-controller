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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandModels = void 0;
const hand_pose_detection_1 = require("@tensorflow-models/hand-pose-detection");
const tfjs_1 = require("@tensorflow/tfjs");
const hand_models_1 = require("./hand_models");
class HandModels {
    constructor() {
        this.model = hand_pose_detection_1.SupportedModels.MediaPipeHands;
        this.poseModelName = "handsModel";
        this.poses = [];
        this.getPoseLabel = (predictionData) => {
            const mv = Math.max(...predictionData);
            if (mv > 0.6) {
                return this.poses[predictionData.findIndex((v) => v === mv)];
            }
            return "Unknown";
        };
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.poses = this.loadPoses();
            yield this.loadPoseModel();
            this.detector = yield (0, hand_pose_detection_1.createDetector)(this.model, {
                runtime: "tfjs",
            });
        });
    }
    loadPoses() {
        const key = `tensorflowjs_models/${this.poseModelName}/poses`;
        let res = [];
        try {
            res = JSON.parse(localStorage.getItem(key) || "[]");
        }
        catch (e) {
            res = [];
        }
        return res;
    }
    loadPoseModel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.poses || !this.poses.length) {
                (0, hand_models_1.initDefaultModel)(this.poseModelName);
                this.poses = this.loadPoses();
            }
            try {
                this.poseModel = yield (0, tfjs_1.loadLayersModel)(`localstorage://${this.poseModelName}`);
            }
            catch (e) {
                this.poseModel = undefined;
            }
        });
    }
}
exports.HandModels = HandModels;
