const path = require("path");
var webpack = require('webpack');

module.exports = {
    entry: {
        app : path.join(__dirname,'/client/app.tsx') //Use this to add more builds. Different modules don't have to be together on a single file.
    },
    output: {
        path: path.join(__dirname,'client/build/'),
        filename: '[name].bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
    },
    module: {
        preLoaders: [
            {
                test: /\.tsx?$/,
                loader: "tslint"
            }
        ],
        loaders: [
            {
              test: /\.tsx?$/,
              loader: 'ts'
            },
            {
              test: /\.json$/,
              loader: "json-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js','.jsx','.ts','.tsx']
    },
    devtool: 'cheap-module-source-map'
};
