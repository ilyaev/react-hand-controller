export const initDefaultModel = (modelName: string = "hands") => {
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/info`,
    JSON.stringify({
      dateSaved: "2024-06-21T00:30:18.994Z",
      modelTopologyType: "JSON",
      modelTopologyBytes: 1470,
      weightSpecsBytes: 374,
      weightDataBytes: 10268,
    })
  );
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/model_metadata`,
    JSON.stringify({
      format: "layers-model",
      generatedBy: "TensorFlow.js tfjs-layers v4.20.0",
      convertedBy: null,
    })
  );
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/model_topology`,
    JSON.stringify({
      class_name: "Sequential",
      config: {
        name: "sequential_2",
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
              name: "dense_Dense4",
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
              name: "dense_Dense5",
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
              name: "dense_Dense6",
              trainable: true,
            },
          },
        ],
      },
      keras_version: "tfjs-layers 4.20.0",
      backend: "tensor_flow.js",
    })
  );
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/weight_data`,
    "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"
  );
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/weight_specs`,
    JSON.stringify([
      { name: "dense_Dense4/kernel", shape: [63, 1], dtype: "float32" },
      { name: "dense_Dense4/bias", shape: [1], dtype: "float32" },
      { name: "dense_Dense5/kernel", shape: [1, 500], dtype: "float32" },
      { name: "dense_Dense5/bias", shape: [500], dtype: "float32" },
      { name: "dense_Dense6/kernel", shape: [500, 3], dtype: "float32" },
      { name: "dense_Dense6/bias", shape: [3], dtype: "float32" },
    ])
  );
  localStorage.setItem(
    `tensorflowjs_models/${modelName}/poses`,
    JSON.stringify(["five", "hold", "pinch"])
  );
};
