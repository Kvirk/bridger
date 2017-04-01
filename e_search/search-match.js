// (function(){

  const elasticsearch = require('elasticsearch');
  // const esClient = new elasticsearch.Client({
  //   host: process.env.ELASTIC_URL,
  //   log: 'error'
  // });

  const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_URL,
    auth: '${process.env.ELASTIC_URL}:${process.env.ELASTIC_URL}',
    log: 'error'
  });

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };

  // only for testing purposes
  // all calls should be initiated through the module
  const invokeSearch = function invokeSearch(value, fieldValues) {
    // console.log("data are", results);
    // console.log("specific attributes", results[0].industry);
    let body = {
      size: 20,
      from: 0,
      query: {
        multi_match: {
          query: value,
          type: 'best_fields',
          fields: fieldValues,
          fuzziness: 'auto'
        }
      }
    };

    console.log(`retrieving documents with query: '${body.query.multi_match.query}' (displaying ${body.size} items at a time)...`);
    return search('users', body);
  };

  // invokeSearch();

  module.exports = {
    invokeSearch
  };
// } ());

