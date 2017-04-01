
(function () {
  'use strict';
  require('dotenv').config()
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

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const test = function test() {
    let body = {
      // size: 20,
      // from: 0,
      query: {
        // bool: {
          // must: {
            match: {
              "_all": "software engineer"
              // query: 'software',
              // fields: ['summary', 'industry', 'headline', 'location', 'current_share'],
              // fuzziness: 'auto'
            }
          // }
          // should: {
          //   match_phrase:{
          //     "_all":"software engineer"
          //   }
          // }
        // }
      }
    };

    console.log(`retrieving documents whose summary and headline matches phrase '${body.query}' (displaying ${body.size} items at a time)...`);
    search('users', body)
    .then(results => {
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      if (results.hits.total > 0) console.log(`returned article summary:`);
      results.hits.hits.forEach((hit, index) => console.log(`\t ${hit._source.first_name} - ${hit._source.headline} - ${hit._source.summary}  (score: ${hit._score})`));
    })
    .catch(console.error);
  };

  test();

  module.exports = {
    search
  };
} ());
