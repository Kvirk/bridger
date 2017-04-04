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

// const esClient = new elasticsearch.Client({
//   host: '127.0.0.1:9200',
//   log: 'error'
// });

const search = function search(index, body) {
  return esClient.search({index: index, body: body});
};

// only for testing purposes
// all calls should be initiated through the module
const invokeSearch = function invokeSearch(value, fieldValues) {
  // console.log("Value ==>", value);
  // let body = {
  //   size: 20,
  //   from: 0,
  //   query: {
  //     multi_match: {
  //       query: value,
  //       type: 'best_fields',
  //       fields: fieldValues,
  //       fuzziness: 'auto'
  //     }
  //   }
  // };

  let body = {
    query: {
      bool: {
        must_not: {
          match: {
            "id": value.id
          }
        },
        should: {
          // match: {
          //   "_all": value.headline,
          //   "_all": value.location,
          //   "_all": value.summary,
          //   "_all": value.industry,
          //   "_all": value.current_share,
          //   "_all": value.position_company_name,
          //   "_all": value.position_company_industry,
          //   "_all": value.position_company_type,
          //   "_all": value.position_company_location,
          //   "_all": value.position_company_summary,
          //   "_all": value.position_company_title
          // }
          dis_max: {
            tie_breaker: 0.7,
            boost: 1.2,
            queries: [
              {
                query_string: {
                  query: value.headline
                },
              },
              {
                query_string: {
                  query: value.location
                },
              },
              {
                query_string: {
                  query: value.summary
                },
              },
              {
                match: {
                  "_all": value.industry
                }
              },
              {
                query_string: {
                  query: value.current_share
                }
              },
              {
                query_string: {
                  query: value.position_company_name
                }
              },
              {
                query_string: {
                  query: value.position_company_industry
                }
              },
              {
                query_string: {
                  query: value.position_company_type
                }
              },
              {
                query_string: {
                  query: value.position_company_location
                }
              },
              {
                query_string: {
                  query: value.position_company_summary
                }
              },
              {
                query_string: {
                  query: value.position_company_title
                }
              }
            ]
          }
        }
      }
    }
  };
  console.log("Search body ===>", body);
  return search('users', body);
};

module.exports = {
  invokeSearch
};

