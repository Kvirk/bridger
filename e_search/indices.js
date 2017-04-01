
(function () {
  'use strict';

  const knexSettings = require("../knexfile.js");
  require('dotenv').config()
  const settings = require("../settings"); // settings.json
  let connection = knexSettings.development;

  if (process.env.NODE_ENV === 'production'){
    connection = knexSettings.production;
  }

  const knex = require('knex')(
    connection);

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: [
      {
        host: process.env.ELASTIC_URL,
        auth: `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`,
        port: process.env.ELASTIC_PORT,
        protocol: process.env.ELASTIC_PROTOCOL,
        log: 'error'
      }
    ]
  });

  const indices = function indices() {
    return esClient.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    console.log(`elasticsearch indices information:`);
    indices();
  };

  test();

  module.exports = {
    indices
  };
} ());
