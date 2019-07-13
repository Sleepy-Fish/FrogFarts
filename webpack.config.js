const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const env = process.env.NODE_ENV

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  devtool: env === 'development' ? 'inline-source-map' : false,
  devServer: {
    // Content not built by webpack is served directly from /frontend/game
    // That means requests will fall through to static requests for files in here
    contentBase: './src/',
    // Enable hot-module-reloading
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // The plugin will minify automatically if `mode` is `production`
      // Otherwise it will not.
      // minify: true
    }),
    /**
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     */
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ],
  }
};
