const path = require('path');

module.exports = {
    entry : './src/js/index.js',
    output:{
        path : path.resolve(__dirname,'dist'),
        filename : 'js/bundle.js'
    },
    devServer :{
        contentBase : './dist'
    }
};
// 웹팩이란 ? https://memory.today/dev/22
//http://jeonghwan-kim.github.io/js/2017/05/15/webpack.html