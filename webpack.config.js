const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve(`${__dirname}/src/index.js`),
  output: {
    path: path.resolve(`${__dirname}/public/dist`),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    host: 'localhost',
    port: 8888,
    inline: true,
    colors: true,
    historyApiFallback: true,
    proxy: [{
      path: '/api/*',
      target: 'http://localhost:1234',
    }],
  },
};
