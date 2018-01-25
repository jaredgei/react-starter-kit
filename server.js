const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(express.static('./'));
app.use(express.static('dist'));

if (!isProduction) {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        stats: {colors: true}
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));
}

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('app listening on', port);
});
