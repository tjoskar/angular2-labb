const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    cache: false,
    debug: false,

    entry: {
        app: './src/boot.ts',
        vendors: [
            'es6-shim',
            'reflect-metadata',
            'rxjs', // Aggressive and stupid
            'zone.js/dist/zone-microtask',
            'zone.js/dist/long-stack-trace-zone',
            'angular2/platform/browser',
            'angular2/core',
            'angular2/http',
            'angular2/router'
        ]
    },
    output: {
        path: './src/',
        filename: 'one-file-to-rule-them-all.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts',
            exclude: /node_modules/,
            query: {
                compilerOptions: {
                    removeComments: true,
                    noEmitHelpers: true,
                }
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }],
        noParse: [/zone\.js\/dist\/.+/]
    },
    resolve: {
        cache: false,
        extensions: ['', '.ts', '.js']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js', Infinity),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.ProvidePlugin({
            '__metadata': 'ts-helper/metadata',
            '__decorate': 'ts-helper/decorate',
            '__awaiter': 'ts-helper/awaiter',
            '__extends': 'ts-helper/extends',
            '__param': 'ts-helper/param'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: false,
            compress: { screw_ie8 : true },
            comments: false
        })
    ]
};
