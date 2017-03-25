const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const settings = require("./settings"); // settings.json
const pg = require("pg");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html')
});

io.on('connection', function(client) {
  console.log('client connected!');
  client.on('join', function(data) {
    client.emit("message", "leave me alone")
  });

  client.on('user', function(data) {
    console.log(data);
  });
  client.on('disconnect', function() {
    console.log("disconnect")
    console.log(client.id)
  });
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});
