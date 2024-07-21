const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/color-crafter.ts',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'color-crafter.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
