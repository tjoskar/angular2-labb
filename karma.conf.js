const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        exclude: [ ],
        files: [
            // Only specify one entry point
            // and require all tests in there
            { pattern: 'unit-test.bundle.js', watched: false }
        ],
        preprocessors: { 'unit-test.bundle.js': ['webpack', 'sourcemap'] },

        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        loader: 'source-map-loader',
                        exclude: [
                            // these packages have problems with their sourcemaps
                            path.resolve(__dirname, 'node_modules/rxjs'),
                            path.resolve(__dirname, 'node_modules/@angular')
                        ]
                    }
                ],
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'awesome-typescript-loader',
                        query: {
                            doTypeCheck: false
                        }
                    },

                    // Support for CSS as raw text
                    { test: /\.css$/, loader: 'raw-loader' },

                    { test: /\.scss$/, loaders: ["style", "css", "sass"] },

                    // support for .html as raw text
                    { test: /\.html$/,  loader: 'raw-loader', exclude: [ './src/index.html' ] }
                ],
                noParse: [/zone\.js\/dist\/.+/]
            },
            debug: false,
            stats: { colors: true, reasons: false, errorDetails: true }
        },

        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'mocha' ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            // 'Firefox',
            'Electron'
        ],
        electronOpts: {
            title: 'Yoo boy!'
        },
        singleRun: false
    });

};
