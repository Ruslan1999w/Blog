var path = require("path");
var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "static/js/index.js"),

  output: {
    path: path.join(__dirname, "/static/js"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: "webpack-stats.json"
    })
  ],

  optimization: {
    minimize: true
  }
};
