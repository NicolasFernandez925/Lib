const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'export/styles/global-style.css', to: 'style' }],
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
