const path = require('path');

module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsRoot: path.posix.resolve(__dirname, '../dev'),
        useEslint: true
    },
    build: {
        assetsSubDirectory: 'static',
        assetsRoot: path.posix.resolve(__dirname, '../dist'),
        publicPath: '/' //默认地址
    }
}