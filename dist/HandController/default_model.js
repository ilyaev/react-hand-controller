"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDefaultModel = void 0;
const initDefaultModel = (modelName = "hands") => {
    localStorage.setItem(`tensorflowjs_models/${modelName}/info`, JSON.stringify({
        dateSaved: "2024-06-17T17:30:28.899Z",
        modelTopologyType: "JSON",
        modelTopologyBytes: 1472,
        weightSpecsBytes: 378,
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
            name: "sequential_3",
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
                        name: "dense_Dense9",
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
                        name: "dense_Dense10",
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
                        name: "dense_Dense11",
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
        { name: "dense_Dense9/kernel", shape: [63, 1], dtype: "float32" },
        { name: "dense_Dense9/bias", shape: [1], dtype: "float32" },
        { name: "dense_Dense10/kernel", shape: [1, 500], dtype: "float32" },
        { name: "dense_Dense10/bias", shape: [500], dtype: "float32" },
        { name: "dense_Dense11/kernel", shape: [500, 3], dtype: "float32" },
        { name: "dense_Dense11/bias", shape: [3], dtype: "float32" },
    ]));
    localStorage.setItem(`tensorflowjs_models/${modelName}/poses`, JSON.stringify(["pinch", "five", "hold"]));
};
exports.initDefaultModel = initDefaultModel;
