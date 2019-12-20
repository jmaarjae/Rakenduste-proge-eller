const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.jsx",
  output: {
    filename: "static/bundle.js"
  },
  devtool: "eval-source-map",
  plugins: [
    new CopyPlugin([
      {
        from: "public/index.html"
      }
    ]),
    new CopyPlugin([
      {
        from: "public/images",
        to: "static/images"
      }
    ]),
    new CopyPlugin([
      {
        from: "public/main.css",
        to: "static/main.css"
      }
    ]),
    new CleanWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      //edasisuunamiseks
      "/api": "http://localhost:3000"
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "static/fonts"
            }
          }
        ]
      }
    ]
  }
};
