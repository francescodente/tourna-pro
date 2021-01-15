module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/style/base.scss"; @import "@/style/variables.scss";'
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}