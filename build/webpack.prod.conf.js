const merge = require('webpack-merge');
const utils = require('./utils');
const webpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
//压缩js
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

const prodWebpackConfig = merge(webpackConfig, {
    mode: 'production',
    output: {
        publicPath: utils.publicPath()
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('styles/[name].[hash:8].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: { safe: true }
        }),
        new uglifyjsWebpackPlugin({
            parallel: true,
            uglifyOptions: {
                ie8: true,
                safari10: true,
                compress: {
                    drop_console: true
                },
                warnings: false
            }
        })
    ],
    optimization: {
        splitChunks: {
            minSize: 50000,
            name: false,
            cacheGroups: {
                vendors: {
                    test: /[\\/]{1,2}node_modules[\\/]{1,2}(?!echarts)/,
                    name: 'vendors',
                    chunks: 'initial',
                    minChunks: 4,
                    enforce: true
                },
                commons: {
                    test: /[\\/]src[\\/]/,
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 5
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
        }
    }
})

module.exports = prodWebpackConfig;