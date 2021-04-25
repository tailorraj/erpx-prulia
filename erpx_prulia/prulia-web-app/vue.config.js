const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  parallel: true,
  publicPath: '/beta/',
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: { output: { ascii_only: true } }
      })
    ]
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
