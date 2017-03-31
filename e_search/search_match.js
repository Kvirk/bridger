require('dotenv').config()
(function () {
  'use strict';

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_URL,
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      size: 20,
      from: 0,
      query: {
        multi_match: {
          query: 'software',
          fields: ['summary','headline'],
          fuzziness: 2
        }
      }
    };

    console.log(`retrieving documents whose summary and headline matches phrase '${body.query.multi_match.query}' (displaying ${body.size} items at a time)...`);
    search('users', body)
    .then(results => {
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      if (results.hits.total > 0) console.log(`returned article summary:`);
      results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.first_name} - ${body.from + ++index} - ${hit._source.headline} - ${hit._source.summary}  (score: ${hit._score})`));
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    search
  };
} ());
