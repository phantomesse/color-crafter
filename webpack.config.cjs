const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/color-crafter.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'color-crafter.js',
    library: 'colorCrafter',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
};
