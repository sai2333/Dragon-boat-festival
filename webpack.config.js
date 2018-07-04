const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: './src/index.js',
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            title: '端午节快乐',
            template: './dist/dumplings.html'
        })
    ],
    //出口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    //依赖
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    }
};