const path = require("path");
const webpack = require("webpack");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "gugudan-setting",
  mode: "development", // 실서비스: production
  devtool: "eval", // 빠르게
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    // 입력
    app: ["./client"], // 파일이 불러오는 다른 파일은 작성해 줄 필요가 없다. 확장자 생략 -> resolve
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, // .js, .jsx
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 1% in KR"], // https://github.com/browserslist/browserslist#full-list
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ], // plugin들의 모음이 preset
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
          ],
        },
      },
    ],
  },
  plugins: [
    // 확장 플러그인(추가적으로 하고 싶은 작업)
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin(),
  ],
  output: {
    // 출력
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/", // webpack-dev-server가 사용하는 결과물 간의 상대 경로
  },
  devServer: {
    publicPath: "/dist",
    hot: true,
  },
};
