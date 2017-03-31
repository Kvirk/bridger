require('dotenv').config()

(function() {

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_URL,
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
