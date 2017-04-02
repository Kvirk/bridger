// (function(){

  const elasticsearch = require('elasticsearch');
  // const esClient = new elasticsearch.Client({
  //   host: process.env.ELASTIC_URL,
  //   log: 'error'
  // });

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
  const invokeSearch = function invokeSearch(value, fieldValues) {
    // console.log("data are", results);
    // console.log("specific attributes", results[0].industry);
    let body = {
      query: {
        bool: {
          must: {
            match: {
              "_all": value.summary,
              "_all": value.location,
              "_all": value.headline
              // "_all": value.current_share
              // "_all": value.position_company_name,
              // "_all": value.position_company_industry,
              // "_all": value.position_company_type,
              // "_all": value.position_company_location,
              // "_all": value.position_company_summary,
              // "_all": value.position_company_title
            }
          },
          should: {
            match_phrase:{
              "_all": value.headline,
              "_all": value.industry
            }
          }
        }
      }
    };
    console.log(`retrieving documents with query: '${body.query}' (displaying ${body.size} items at a time)...`);
    return search('users', body);
  };

  // invokeSearch();

  module.exports = {
    invokeSearch
  };
// } ());

