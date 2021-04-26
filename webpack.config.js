const path = require('path');

module.exports = {
  entry: './src/script/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    test: /\.s[ac]ss$/i,
    use: [{
      loader: 'css-loader',
      options: {
        url: false,
      },
    }],
  },
};
