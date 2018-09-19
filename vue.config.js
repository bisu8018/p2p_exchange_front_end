// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxy: 'http://localhost:8080',
        https: false
    },
    productionSourceMap: false,     // 개발자 도구 webpack 소스 공개여부
}