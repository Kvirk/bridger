(function () {
  'use strict';

  const settings = require("../settings"); // settings.json
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

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let queryValues = knex.select().table('users').where('id', 1)
    .then((results) => {
      // console.log("data are", results);
      // console.log("specific attributes", results[0].industry);
      let body = {
        size: 20,
        from: 0,
        query: {
          multi_match: {
            query: results[0].industry,
            type: 'best_fields',
            fields: ['industry'],
            fuzziness: 'auto'
          }
        }
      };

      console.log(`retrieving documents with query: '${body.query.multi_match.query}' (displaying ${body.size} items at a time)...`);
      search('users', body)
      .then(results => {
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) console.log(`returned article summary:`);
        results.hits.hits.forEach((hit, index) => {
          console.log(`\t ${hit._source.first_name} - ${hit._source.linkedin_id} - ${body.from + ++index} - ${hit._source.headline} - ${hit._source.summary}  (score: ${hit._score})`);
        })
      }, err => {console.log(err)})
    }, err => {console.log(err)})
  };

  test();

  module.exports = {
    search
  };
} ());
