const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const settings = require("./settings"); // settings.json
const pg = require("pg");
const util = require('util');
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
    client.emit("message", "leave me alone");
  });

  client.on('user', function(data) {
    let position_company_name = [];
    let position_company_industry = [];
    let position_company_type = [];
    let position_company_location = [];
    let position_company_summary = [];
    let position_company_title = [];
    if (data.positions.values) {
      data.positions.values.forEach((position) => {
        position_company_name.push(position.company.name);
        position_company_industry.push(position.company.industry);
        position_company_type.push(position.company.type);
        position_company_location.push(position.location.name);
        position_company_summary.push(position.summary);
        position_company_title.push(position.title);
      })
    }

    let headline = !data.headline ? '' : data.headline;
    let location = !data.location ? '' : data.location.name;
    let industry = !data.industry ? '' : data.industry;
    let current_share = !data.currentShare ? '' : data.currentShare.content.description;
    let summary = !data.summary ? '' : data.summary;
    let picture_url = !data.pictureUrls.values ? '' : data.pictureUrls.values[0];

    let insertData = {
        linkedin_id: data.id,
        first_name: data.firstName,
        last_name: data.lastName,
        headline: headline,
        industry: industry,
        location: location,
        summary: summary,
        num_connections: data.numConnections,
        picture_url: picture_url,
        public_profile_url: data.publicProfileUrl,
        current_share: current_share,
        positions: data.positions._total,
        position_company_name: JSON.stringify(position_company_name),
        position_company_industry: JSON.stringify(position_company_industry),
        position_company_type: JSON.stringify(position_company_type),
        position_company_location: JSON.stringify(position_company_location),
        position_company_summary: JSON.stringify(position_company_summary),
        position_company_title: JSON.stringify(position_company_title)
        };
    let insert = knex('users').insert(insertData).toString();
    let update = knex('users').update(insertData).whereRaw('users.linkedin_id = ' + "'" + insertData.linkedin_id + "'").toString();
    let query = util.format('%s ON CONFLICT (linkedin_id) DO UPDATE SET %s', insert, update.replace(/^update\s.*\sset\s/i, ''));
    knex.raw(query).catch((err) => {
      console.error(err);
    });
  });

  client.on('createEvent', function(data) {
    let insertData = {
      name: data.formInput.name,
      description: data.formInput.description,
      venue: data.formInput.venue,
      start_time: data.formInput.start,
      end_time: data.formInput.end
    }
    let insert = knex('events').insert(insertData).toString();
    knex.raw(insert).catch((err) => {
      console.error(err);
    });
    console.log('Create event comes here')
    console.log('This is data', data.formInput)

  })

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
