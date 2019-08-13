const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry : ['babel-polyfill', './src/js/index.js'], // bundling 을 시작하는 곳.
    output:{ // bundle 을 저장할 곳.
        path : path.resolve(__dirname,'dist'), //절대 경로가 필요함.
        filename : 'js/bundle.js'
    },
    devServer :{
        contentBase : './dist'
    },

    plugins : [
        new HtmlWebpackPlugin({
            filename : 'index.html',
            template : './src/index.html'
        })
    ],
    module :{
        rules: [
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }

};
// 웹팩이란 ? https://memory.today/dev/22
//http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html
//https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d