// vue.config.js
module.exports = {
  // options...
  devServer: {
      proxy: 'https://localhost:8080',
      https: true,
  }
}