const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/client/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors]
        './client/app.jsx'
    ],
    output: {
        path: path.join(__dirname, 'client/build/'),
        filename: '[name].bundle.js', // this is the default name, so you can skip it
        // at this directory our bundle file will be available
    },
    plugins: [HTMLWebpackPluginConfig],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/, /bower_components/, /typings/],
            loaders: ['babel-loader'],
        }, {
            test: /\.json$/,
            exclude: [/node_modules/, /bower_components/, /typings/],
            loader: "json-loader"
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        fs: "empty"
    },

};
