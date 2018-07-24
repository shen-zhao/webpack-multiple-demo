const rm = require('rimraf');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const utils = require('./utils');
const webpackConfig = require('./webpack.config');

const devWebpackConfig = merge(webpackConfig, {
    devtool: 'cheap-source-map',
    plugins: [
        new CopyWebpackPlugin([
            {
                from: utils.resolve('src/mock/js'),
                to: path.posix.resolve(config.dev.assetsRoot, 'vm')
            },
            {
                from: utils.resolve('src/mock/json'),
                to: path.posix.resolve(config.dev.assetsRoot, 'mock/json')
            }
        ])
    ]
});

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