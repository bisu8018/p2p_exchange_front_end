/*
// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxy: 'https://otc.demo.com',
        https: false,
        disableHostCheck: true,
        port: 8081
    },
    productionSourceMap: false,     // 개발자 도구 webpack 소스 공개여부
}
*/


// vue.config.js
module.exports = {
    // options...
    devServer: {
        proxy: 'http://localhost:8080',
        https: false
    },
    productionSourceMap: false,     // 개발자 도구 webpack 소스 공개여부
}
