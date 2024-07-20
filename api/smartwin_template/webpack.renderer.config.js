const rules = require('./webpack.rules');
const path = require('path');

rules.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader' }],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/i,
    include: path.resolve(__dirname, 'src/Assets/images'),
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
    ],
  }
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
