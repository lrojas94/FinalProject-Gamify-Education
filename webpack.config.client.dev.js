const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        app: path.join(__dirname, '/client/app.jsx') //Use this to add more builds. Different modules don't have to be together on a single file.
    },
    output: {
        path    : path.join(__dirname, 'client/build/'),
        filename: '[name].bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
    },
    module: {
        loaders: [{
            test    : /\.jsx?$/,
            exclude : [/node_modules/, /typings/, /www/],
            loader  : 'babel-loader',
            query   : {
                presets : ['react', 'es2015'],
                plugins : ["transform-class-properties"]
            }
        }, {
            test   : /\.json$/,
            loader : "json-loader"
        }, {
            test   : /\.css$/,
            loader : "style-loader!css-loader"
        }, {
            test   : /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader : 'file-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    node: {
        fs: "empty"
    },

};
