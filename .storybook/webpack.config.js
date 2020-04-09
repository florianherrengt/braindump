const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const defaultConfig = require('../webpack.config');

const path = require('path');

module.exports = {
    entry: '../src/index.tsx',
    mode: 'development',
    module: defaultConfig.module,
    resolve: defaultConfig.resolve,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};
