const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = true;

module.exports = {
    devtool: 'inline-source-map',
    cache: true,
    debug: false,

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendors.ts',
        'main': './src/boot.ts'
    },

    output: {
        path: './src',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader', exclude: [ path.resolve(__dirname, 'node_modules/rxjs') ] }
        ],
        loaders: [
            { test: /\.ts$/, loader: 'awesome-typescript-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            { test: /\.scss$/, loaders: ["style", "css", "sass"] },

            // Support for .html as raw text
            { test: /\.html$/,  loader: 'raw-loader', exclude: [ './src/index.html' ] }
        ]
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    devServer: {
        port: 9000,
        host: 'localhost',
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'src'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
        new webpack.DefinePlugin({
            HMR,
            ENV: JSON.stringify(ENV)
        })
    ]
};
