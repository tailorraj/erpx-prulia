var BomPlugin = require('webpack-utf8-bom') // add this line

module.exports = {
  parallel: true,
  publicPath: '/beta/',
  assetsDir: 'static',
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    plugins: [new BomPlugin(true)]
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
