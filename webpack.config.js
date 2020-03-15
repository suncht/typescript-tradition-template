const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build/webpack.${env}`)(env);

const assetsSubDirectory = `static`
const assetsPath = function (_path) {
  return path.posix.join(assetsSubDirectory, _path)
}

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
      entry: './src/index.ts',
      mode,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ["source-map-loader"],
            enforce: "pre",
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|bmp)$/,
            use: [{
              loader: 'file-loader',
              options: {
                emitFile: true
              }
            }]
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('img/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('media/[name].[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: assetsPath('fonts/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, 'dist'),
      },
      optimization: {
        splitChunks: {
          chunks: 'all'
        }
      },
      plugins: [
        new CleanWebpackPlugin({}),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, './static'),
            to: assetsSubDirectory,
            ignore: ['.*']
          }
        ]),
        new HtmlWebPackPlugin({
          filename: 'index.html',
          template: 'src/index.html'
        })
      ]
    },
    modeConfig(mode)
  );
};
