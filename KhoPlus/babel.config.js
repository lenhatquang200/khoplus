var path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          resolvePath(sourcePath, currentFile, opts) {
            if (
              sourcePath === "react-native" &&
              !(
                (
                  currentFile.includes("node_modules/react-native/") || // macos/linux paths
                  currentFile.includes("node_modules\\react-native\\")
                ) // windows path
              ) &&
              !(
                currentFile.includes("resolver/react-native/") ||
                currentFile.includes("resolver\\react-native\\")
              )
            ) {
              return path.resolve(__dirname, "resolver/react-native");
            }
            /**
             * The `opts` argument is the options object that is passed through the Babel config.
             * opts = {
             *   extensions: [".js"],
             *   resolvePath: ...,
             * }
             */
            return (
              (sourcePath == "@components" &&
                path.resolve(__dirname, "./src/components")) ||
              (sourcePath == "@public" &&
                path.resolve(__dirname, "./src/public"))
            );
          },
          alias: {
            tests: ["./tests/"],
            components: "./src/components",
            public: "./src/public",
          },
        },
      ],
    ],
  };
};
