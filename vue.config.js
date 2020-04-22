module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true, // 是否允许跨越, 开发环境中使用
                pathRewrite: {
                '^/api': '/mock'
                }
            }
        }
    }
}
// module.exports = {
//     devServer: {
//        before: require('./src/mock/inedx.js')
//     }
// }