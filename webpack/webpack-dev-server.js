var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./dev.config');

var compiler = webpack(webpackConfig);
var host = process.env.HOST || 'localhost';
var port = process.env.PORT && parseInt(process.env.PORT, 10) + 1 || 3031;

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true
  }
};

var app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> Webpack development server listening on port %s.', port);
  }
});
