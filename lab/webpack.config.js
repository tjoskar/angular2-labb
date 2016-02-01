require('es6-shim');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: './src/boot.ts',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
