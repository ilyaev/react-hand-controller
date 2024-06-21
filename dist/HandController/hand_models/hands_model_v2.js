"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDefaultModel = void 0;
const initDefaultModel = (modelName = "hands") => {
    localStorage.setItem(`tensorflowjs_models/${modelName}/info`, JSON.stringify({
        dateSaved: "2024-06-21T17:24:50.991Z",
        modelTopologyType: "JSON",
        modelTopologyBytes: 1470,
        weightSpecsBytes: 374,
        weightDataBytes: 10268,
    }));
    localStorage.setItem(`tensorflowjs_models/${modelName}/model_metadata`, JSON.stringify({
        format: "layers-model",
        generatedBy: "TensorFlow.js tfjs-layers v4.20.0",
        convertedBy: null,
    }));
    localStorage.setItem(`tensorflowjs_models/${modelName}/model_topology`, JSON.stringify({
        class_name: "Sequential",
        config: {
            name: "sequential_1",
            layers: [
                {
                    class_name: "Dense",
                    config: {
                        units: 1,
                        activation: "linear",
                        use_bias: true,
                        kernel_initializer: {
                            class_name: "VarianceScaling",
                            config: {
                                scale: 1,
                                mode: "fan_avg",
                                distribution: "normal",
                                seed: null,
                            },
                        },
                        bias_initializer: { class_name: "Zeros", config: {} },
                        kernel_regularizer: null,
                        bias_regularizer: null,
                        activity_regularizer: null,
                        kernel_constraint: null,
                        bias_constraint: null,
                        name: "dense_Dense1",
                        trainable: true,
                        batch_input_shape: [null, 63],
                        dtype: "float32",
                    },
                },
                {
                    class_name: "Dense",
                    config: {
                        units: 500,
                        activation: "relu",
                        use_bias: true,
                        kernel_initializer: {
                            class_name: "VarianceScaling",
                            config: {
                                scale: 1,
                                mode: "fan_avg",
                                distribution: "normal",
                                seed: null,
                            },
                        },
                        bias_initializer: { class_name: "Zeros", config: {} },
                        kernel_regularizer: null,
                        bias_regularizer: null,
                        activity_regularizer: null,
                        kernel_constraint: null,
                        bias_constraint: null,
                        name: "dense_Dense2",
                        trainable: true,
                    },
                },
                {
                    class_name: "Dense",
                    config: {
                        units: 3,
                        activation: "linear",
                        use_bias: true,
                        kernel_initializer: {
                            class_name: "VarianceScaling",
                            config: {
                                scale: 1,
                                mode: "fan_avg",
                                distribution: "normal",
                                seed: null,
                            },
                        },
                        bias_initializer: { class_name: "Zeros", config: {} },
                        kernel_regularizer: null,
                        bias_regularizer: null,
                        activity_regularizer: null,
                        kernel_constraint: null,
                        bias_constraint: null,
                        name: "dense_Dense3",
                        trainable: true,
                    },
                },
            ],
        },
        keras_version: "tfjs-layers 4.20.0",
        backend: "tensor_flow.js",
    }));
    localStorage.setItem(`tensorflowjs_models/${modelName}/weight_data`, "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");
    localStorage.setItem(`tensorflowjs_models/${modelName}/weight_specs`, JSON.stringify([
        { name: "dense_Dense1/kernel", shape: [63, 1], dtype: "float32" },
        { name: "dense_Dense1/bias", shape: [1], dtype: "float32" },
        { name: "dense_Dense2/kernel", shape: [1, 500], dtype: "float32" },
        { name: "dense_Dense2/bias", shape: [500], dtype: "float32" },
        { name: "dense_Dense3/kernel", shape: [500, 3], dtype: "float32" },
        { name: "dense_Dense3/bias", shape: [3], dtype: "float32" },
    ]));
    localStorage.setItem(`tensorflowjs_models/${modelName}/poses`, JSON.stringify(["five", "hold", "pinch"]));
};
exports.initDefaultModel = initDefaultModel;
