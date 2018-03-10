const webpack = require('webpack')
const paths = require('./paths')

module.exports = {
  entry: {
    app: [
      'phaser',
      paths.appEntry
    ]
  },
  output: {
    path: paths.appBuild,
    publicPath: '/build/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: [/\.js$/],
        use: 'babel-loader',
        include: paths.appSrc
      },
      {
        test: [/\.(png|jpg|gif)$/],
        use: 'file-loader'
      },
      {
        test: [/\.(vert|frag)$/],
        use: 'raw-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /phaser/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: true,
      WEBGL_RENDERER: true
    })
  ],
  resolve: {
    alias: {
      '@': paths.appSrc
    }
  }
}
