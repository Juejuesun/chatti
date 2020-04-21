module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                '^/api': '/mock'
                }
            }
        }
    }
}
// module.exports = {
//     devServer: {
//        before: require('./public/mock/inedx.js')
//     }
// }