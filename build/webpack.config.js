const path = require('path');
const config = require('../config');
const utils = require('./utils');
const baseUrl = './src/js/';
const pageConf = utils.dealPageConf(baseUrl);

const env = process.env.NODE_ENV;

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        ...pageConf.entryMap,
        stylesheet: './src/js/stylesheet.js' //公共css入口
    },
    output: {
        path: env === 'production' ? config.build.assetsRoot : config.dev.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js')
    },
    resolve: {
        alias: {
            '@': utils.resolve('src')
        }
    },
    module: {
        rules: [
            ...utils.styleLoaders({usePostCSS: true}),
            //eslint
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                },
                include: [utils.resolve('src')]
            },
            //babel
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                },
                include: [utils.resolve('src')]
            },
            {   //引入html模板提供给arttemplate使用
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    //开启压缩
                    minimize: true,
                    interpolate: 'require'
                },
                include: [utils.resolve('src/templates')]
            },
            {   //处理非js引用html时对静态资源进行处理（代替velocity的#parse()）
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    interpolate: 'require', //支持页面里面的require语法
                    attrs: ['img:src', 'video:src', 'audio:src', 'link:href'] //修改静态资源前缀
                },
                include: [utils.resolve('src/pages'), utils.resolve('src/inc')]
            },
            {   //图片处理
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('img/[name].[hash:8].[ext]'),
                    publicPath: env === 'production' ? utils.publicPath() : '../'
                },
                include: [utils.resolve('src')]
            },
            {   //管理字体
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('font/[name].[hash:8].[ext]')
                },
                include: [utils.resolve('src')]
            },
            {   //管理媒体
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: utils.assetsPath('media/[name].[hash:8].[ext]'),
                    publicPath: env === 'production' ? utils.publicPath() : '../'
                },
                include: [utils.resolve('src')]
            }
        ]
    },
    plugins: [
        ...pageConf.htmlArr, //实例多页面入口
    ]
}