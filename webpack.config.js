const path = require('path');
const glob = require('glob');

module.exports = {
  entry: {
    index: './src/ts/index.ts'
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};