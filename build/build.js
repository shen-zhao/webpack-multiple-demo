const rm = require('rimraf');
const ora = require('ora');
const webpack = require('webpack');
const prodWebpackConfig = require('./webpack.prod.conf');

let spinner = ora('building for production environment...');
spinner.start();

rm('dist', err => {
    if(err) throw err;
    webpack(prodWebpackConfig, (err, stats) => {
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