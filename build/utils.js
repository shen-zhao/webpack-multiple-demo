const path = require('path');
const fs = require('fs');
const config = require('../config');
const pages = require('../build');
//生成html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//抽提css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const jsTemplate = `import $ from 'jquery';\nimport urlmap from '@/js/urlmap';\nimport template from '@/js/lib/template';`;
const env = process.env.NODE_ENV;

exports.resolve =  dir => {
    return path.posix.join(__dirname, '..', dir);
}

function fsExistsTest (baseUrl, realPath) { //检测脚本是否存在，不存在则创建
    baseUrl = exports.resolve(baseUrl);
    const dirname = mkdir(realPath.split('/'), baseUrl);
    const isExists = fs.existsSync(dirname);
    if(!isExists) {
        fs.writeFileSync(dirname, jsTemplate);
    }
}
//递归创建目录，返回filename
function mkdir(pathChip, baseUrl) {
    const currentChip = pathChip.shift();
    if(/\.js$/.test(currentChip)) {
        return path.posix.join(baseUrl, currentChip);
    }
    const dirname = baseUrl + currentChip;
    const isExists = fs.existsSync(dirname);
    if(isExists) {
        return mkdir(pathChip, dirname);
    } else {
        fs.mkdirSync(dirname);
        return mkdir(pathChip, dirname);
    }
}

exports.publicPath = () => {
    return process.argv[2] || config.build.publicPath;
}

exports.assetsPath = _path => {
    const assetsSubDirectory = env === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path);
}

exports.dealPageConf = baseUrl => {
    const entryMap = {};
    const htmlArr = [];
    let htmlConfig = {};

    pages.forEach((obj, i) => {
        //entry
        fsExistsTest(baseUrl, obj.main);
        entryMap[obj.template] = baseUrl + obj.main;
        //html
        htmlConfig.filename = `./vm/${obj.template}.html`;
        htmlConfig.template = `./src/pages/${obj.template}.html`;
        htmlConfig.inject = true;
        htmlConfig.chunks = [obj.template];
        htmlConfig.chunks.push('manifest')
        obj.stylesheet !== false && htmlConfig.chunks.push('stylesheet')
        obj.vendors && (htmlConfig.chunks.push('vendors'));
        obj.commons && (htmlConfig.chunks.push('commons'));
        obj.echarts && (htmlConfig.chunks.push('echarts'));

        htmlArr.push(
            new HtmlWebpackPlugin(htmlConfig)
        )
    });

    return {
        entryMap,
        htmlArr
    }
}

exports.cssLoaders = options => {
    options = options || {};

    const sourceMap = (env === 'production') ? false : true;

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: sourceMap
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if(loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: sourceMap
                })
            })
        }

        if(env === 'production') {
            return [MiniCssExtractPlugin.loader, ...loaders]
        } else {
            return ['style-loader', ...loaders]
        }
    }

    return {
        'css': generateLoaders(),
        'scss': generateLoaders('sass')
    }
}

exports.styleLoaders = options => {
    const rules = []
    const loaders = exports.cssLoaders(options);

    for (let extension in loaders) {
        const loader = loaders[extension]
        rules.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader,
            include: [exports.resolve('src')]
        })
    }

    return rules;
}
    