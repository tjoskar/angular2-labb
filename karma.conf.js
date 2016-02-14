module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        exclude: [ ],
        files: [
            // Only specify one entry point
            // and require all tests in there
            { pattern: 'test.bundle.js', watched: false }
        ],
        preprocessors: { 'test.bundle.js': ['webpack'] },

        webpack: {
            resolve: {
                extensions: ['', '.ts', '.js']
            },
            module: {
                loaders: [{
                    test: /\.ts$/,
                    loader: 'ts',
                    exclude: /node_modules/
                }],
                noParse: [/zone\.js\/dist\/.+/]
            },
            debug: true,
            stats: { colors: true, reasons: true, errorDetails: true }
        },

        // Webpack please don't spam the console when running in karma!
        webpackServer: { noInfo: true },

        // Available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [ 'mocha' ],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],
        singleRun: true
    });

};
