var webpack = require('webpack');
var config = require('./config');
var WebpackDevServer = require('webpack-dev-server');

var complier = webpack(require('./webpack.config.js'));

var ip = config.ip;
var port = config.port;
var publicPath = config.webpack.publicPath;

var proxy = [{
    path: '/api/*',
    host: 'cnodejs.org',
    target: 'https://cnodejs.org/api/vi',
}];

var server = new  WebpackDevServer(complier, {
    hot: true,
    quiet: true,
    inline: true,
    compress: true,
    staticOptions: {},
    publicPath:  publicPath,
    contentBase: './build/',
    stats: { colors: true }
});
server.listen(port, ip, function () {
    console.log('=======> the server is running at ', ip, port);
});
