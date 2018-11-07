const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const PRODUCTION = process.env.NODE_ENV === 'production'
const DEVSERVER = process.env.DEVSERVER === 'true'

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      require('autoprefixer')({
        /* ... options */
      }),
    ],
  },
}

let plugins = [new AssetsPlugin()]
let cssLoaders = ['css-loader', postcssLoader, 'sass-loader']
if (!DEVSERVER) {
  plugins.push(
    new MiniCssExtractPlugin({ filename: 'bundle.[contenthash].css' })
  )
  cssLoaders.unshift(MiniCssExtractPlugin.loader)
} else {
  cssLoaders.unshift('style-loader')
}

module.exports = {
  entry: './scripts/main.js',
  output: {
    filename: DEVSERVER ? 'bundle.js' : 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: DEVSERVER ? 'http://localhost:8080/build/' : void 0,
  },
  devtool: PRODUCTION ? void 0 : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: cssLoaders,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins,
}
