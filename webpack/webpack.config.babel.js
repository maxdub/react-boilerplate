'use strict';

const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const buildFolder = 'build';
const buildPath = path.resolve(__dirname, `../public/${buildFolder}`);

module.exports = {
    context: path.resolve(__dirname, "../src"),

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
                    ExtractTextPlugin.extract('css'),
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            minimize:true,
                            importLoaders:1,
                            localIdentName:'[path]__[local]___[hash:base64:5]'
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            ignore:'/node_modules',
                            presets: ["es2015", "react", "stage-0"]
                        }
                    }
                ]
            }
        ]
    },

    plugins:[
        new webpack.DefinePlugin({'process.env.BROWSER': true}),
        new CleanWebpackPlugin([buildPath], {root: path.resolve(__dirname, '..')}),
        new ExtractTextPlugin({
          filename: "[name].bundle.css",
          allChunks: true,
        }),
    ]
};