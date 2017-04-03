const elasticsearch = require('elasticsearch');
// const esClient = new elasticsearch.Client({
//   host: [
//     {
//       host: process.env.ELASTIC_URL,
//       auth: `${process.env.ELASTIC_USER}:${process.env.ELASTIC_PASSWORD}`,
//       port: process.env.ELASTIC_PORT,
//       protocol: process.env.ELASTIC_PROTOCOL,
//       log: 'error'
//     }
//   ]
// });

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

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
                query_string: {
                  query: value.industry
                },
              }
              // {
              //   query_string: {
              //     query: value.industry
              //   }
              // }
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

