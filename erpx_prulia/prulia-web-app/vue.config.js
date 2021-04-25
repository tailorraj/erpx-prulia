module.exports = {
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
