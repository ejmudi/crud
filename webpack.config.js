  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: [
        './src/provider.tsx'
      ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
     },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
            extensions: [".Webpack.js", ".web.js", ".ts", ".tsx", ".js"]
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    exclude: /(node_modules)/,
                    loader: "ts-loader"
                }
            ]
        }
  };