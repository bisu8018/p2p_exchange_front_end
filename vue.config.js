// vue.config.js
module.exports = {
  // options...
  devServer: {
    proxy: 'http://localhost:8080',
    https: false
  }
}