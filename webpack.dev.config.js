const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ]
    },
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            use: ["style-loader", "css-loader?modules&localIdentName=[local]-[hash:base64:5]", "postcss-loader",'sass-loader']
        }]
    },
    devServer: {
        port: 8090,
        contentBase: path.join(__dirname, './dist'),
        historyApiFallback: true,
        proxy: [{
          context: ['/api/'],
          target:"http://localhost:7001",
          // target: 'http://127.0.0.1:8888',
          secure: false
        }]
    }
};

// target: 'http://39.106.195.193:8888',

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);