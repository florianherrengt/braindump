const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const defaultConfig = require('../webpack.config');

const path = require('path');

module.exports = {
    entry: '../src/index.tsx',
    mode: 'development',
    module: defaultConfig.module,
    resolve: defaultConfig.resolve,
    output: defaultConfig.output,
    devtool: 'inline-source-map',
    externals: defaultConfig.externals,
};
