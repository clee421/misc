var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './assets/js/exam.js',
  output: {
    // publicPath: '/public/',
    filename: 'public/app_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract("style", "css!sass")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("./public/app_bundle.css")
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  }
};
