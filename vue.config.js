// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxy: 'https://otc.jakincorp.com',
        https: false,
        disableHostCheck: true,
        port: 8081
    },
    productionSourceMap: false,     // 개발자 도구 webpack 소스 공개여부
}