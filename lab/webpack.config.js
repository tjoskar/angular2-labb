require('es6-shim');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: {
        app: './src/boot.ts',
        vendors: [
            'es6-shim',
            'reflect-metadata',
            'rxjs',
            'zone.js/dist/zone-microtask',
            'zone.js/dist/long-stack-trace-zone',
            'angular2/platform/browser'
        ]
    },
    output: {
        path: './src/',
        filename: 'one-file-to-rule-them-all.js'
    },
    module: {
        loaders: [{
            test: /\.ts$/, loader: 'ts', exclude: /node_modules/
        }],
        noParse: [/zone\.js\/dist\/.+/]
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    devServer: {
        port: 9000,
        inline: true,
        hot: true,
        historyApiFallback: true,
        contentBase: 'src'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
