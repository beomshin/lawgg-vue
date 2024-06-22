// const path = require("path");

module.exports = {
  publicPath: '/lawgg',
  // outputDir: path.resolve(__dirname, "../lg-was/src/main/resources/static"),
  devServer : {
    disableHostCheck: true,
    proxy : {
      '/api': {
        target : 'http://localhost:19001',
        changeOrigin: true,
      }
    }
  },
  configureWebpack: config => {
    config.output.filename = 'js/[name].[hash].js'
    config.output.chunkFilename = 'js/[name].[hash].js'
  },
}
