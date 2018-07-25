const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('../config');
const utils = require('./utils');
const webpackConfig = require('./webpack.config');

const devWebpackConfig = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-source-map',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 500,
        ignored: /node_modules/
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: utils.resolve('src/mock/js'),
                to: path.resolve(config.dev.assetsRoot, 'vm')
            },
            {
                from: utils.resolve('src/mock/json'),
                to: path.resolve(config.dev.assetsRoot, 'mock/json')
            }
        ]),
        new ProgressBarPlugin()
    ]
});

module.exports = {
    ...devWebpackConfig
}

rm('dev', err => {
    if(err) throw err;
    webpack(devWebpackConfig, (err, stats) => {
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