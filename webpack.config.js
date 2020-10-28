const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
         
          test: /\.scss$/,     
          use: [
            'style-loader',    
            'css-loader', 
            'sass-loader' 
          ],
        
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app-bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },
};