'use strict';

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildFolder = 'build';
const buildPath = path.resolve(__dirname, `../public/${buildFolder}`);

module.exports = {
    context: path.resolve(__dirname, "src"),

    entry: {
        app: "./client",
    },

    output: {
        path: buildPath,
        publicPath: `/${buildPath}/`,
        filename: 'main.js',
        chunkFilename: '[name].js'
    },

    devServer: {
        contentBase: path.resolve(__dirname, "src/client"),  // New
    },

    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { modules: true } }
                ],
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "babel",
                    options: { presets: ["es2015", "react", "stage-0"] }
                }],
            }
        ]
    },

    plugins:[
        new webpack.DefinePlugin({'process.env.BROWSER': true}),
        new CleanWebpackPlugin([buildPath], {root: path.resolve(__dirname, '..')})
    ]
};