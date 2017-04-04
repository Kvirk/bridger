
(function() {

require('dotenv').config()
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

esClient.explain({
    index: 'users',
    type: 'profile',
    id: '11',
    body: {
      // size: 20,
      // from: 0,
      query: {
        multi_match: {
          query: 'fashion designer',
          type: 'best_fields',
          fields: ['headline', 'summary'],
          fuzziness: 'auto'
        }
      }
    }
  }, (err) => {
    console.log(err);
  })
} ());
