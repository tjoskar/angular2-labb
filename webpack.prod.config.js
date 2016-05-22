const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const devConfig = require('./webpack.config');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const HMR = false;

module.exports = Object.assign({}, devConfig, {
    devtool: 'source-map',
    cache: false,
    debug: false,

    resolve: {
        cache: false,
        extensions: ['', '.ts', '.js']
    },

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8 : true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'vendor', 'polyfills'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            HMR,
            ENV: JSON.stringify(ENV)
        })
    ],

    devServer: undefined
});
