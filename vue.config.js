module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',//测试使用
                // target: 'http://127.0.0.1/',//正式
                changeOrigin: true, // 是否允许跨越, 开发环境中使用
                pathRewrite: {
                '^/api': '/mock',//测试使用
                // '^/api': ''
                }
            }
        }
    },
    css: {
        extract: false
    }
}
// module.exports = {
//     devServer: {
//        before: require('./src/mock/inedx.js')
//     }
// }