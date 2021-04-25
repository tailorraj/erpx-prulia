const BomPlugin = require('webpack-utf8-bom')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  parallel: true,
  publicPath: '/beta/',
  assetsDir: 'static',
  configureWebpack: {
    plugins: [new BomPlugin(true)],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: { output: { ascii_only: true } }
        })
      ]
    }
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://167.99.77.197',
        changeOrigin: true,
        secure: false
      },
      '/files/': {
        target: 'http://167.99.77.197',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
