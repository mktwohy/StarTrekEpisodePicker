const path = require('path');
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    module: {
        rules: [
            //...
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    externals: [
        { jquery: 'jQuery' },
        { sqlite3: 'commonjs sqlite3' },
        { externalsPresets: { node: true } },
        // nodeExternals(),
    ]
}