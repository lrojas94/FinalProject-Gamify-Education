const path = require("path");

module.exports = {
    entry: {
        app : path.join(__dirname,'server/app.ts') //Use this to add more builds. Different modules don't have to be together on a single file.
    },
    output: {
        path: path.join(__dirname,'www'),
        filename: '[name].bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.md$/, loader: "html!markdown"},
            {test: /\.json$/, loader: 'json-loader'}

        ]
    },
    resolve: {
        extensions: ['', '.js','.ts']
    },
    target: "node",
    devtool: 'source-map'
};
