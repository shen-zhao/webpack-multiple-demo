const rm = require('rimraf');
const ora = require('ora');
const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');
const webpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩js
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const testWebpackConfig = merge(webpackConfig, {
    mode: 'none',
    devtool: 'inline-cheap-source-map',
    output: {
        publicPath: utils.publicPath()
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('styles/[name].[hash:8].css')
        }),
        new uglifyjsWebpackPlugin({
            test: /\.js($|\?)/i,
            parallel: true,
            cache: true,
            uglifyOptions: {
                ie8: true,
                output: {
                    beauty: true
                }
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    optimization: {
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        splitChunks: {
            minSize: 50000,
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}(?!echarts)/,
                    name: 'vendors',
                    chunks: 'initial',
                    minChunks: 3,
                    priority: 10, // 优先
                    enforce: true
                },
                commons: {
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 4
                },
                echarts: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}echarts/,
                    name: 'echarts',
                    chunks: 'initial',
                    minChunks: 1
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        noEmitOnErrors: true,
        checkWasmTypes: true,
        mangleWasmImports: true
    }
})

module.exports = testWebpackConfig;

let spinner = ora('building for test environment...');
spinner.start();

rm('dist', err => {
    if(err) throw err;
    webpack(testWebpackConfig, (err, stats) => {
        spinner.stop();
        if(err) throw err;
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
    });
})