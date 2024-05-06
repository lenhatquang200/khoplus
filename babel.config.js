module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          rootPathSuffix: "src",
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@public": "./src/public",
            "@router": "./src/router",
            "@state": "./src/state",
            "@KhoPlus": "./src/KhoPlus",
          },
        },
      ],
    ],
  };
};
