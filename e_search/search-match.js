(function(){

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
  const invokeSearch = function invokeSearch(value, fieldValues) {
      // console.log("data are", results);
      // console.log("specific attributes", results[0].industry);
      let body = {
        size: 20,
        from: 0,
        query: {
          multi_match: {
            query: 'fashion designer',
            type: 'best_fields',
            fields: ['headline', 'summary'],
            fuzziness: 'auto'
          }
        }
      };

      console.log(`retrieving documents with query: '${body.query.multi_match.query}' (displaying ${body.size} items at a time)...`);
      // return search('users', body);
      search('users', body)
      .then((results) => {
        // console.log('---->', results.hits);
        console.log(`found ${results.hits.total} items in ${results.took}ms`);
        if (results.hits.total > 0) {
          // console.log('--->', results.hits);
          results.hits.hits.forEach((hit, index) => {            
            console.log("User id", hit._source.id);
            console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
            let searchResults = {
              userId: hit._source.id,
              matchingScore: hit._score
            }
            // updateUserPoints(searchResults);
          });
        }
      }, (err) => {
        console.log(err);
      });
    };

  invokeSearch();
  
  module.exports = {
    invokeSearch
  };
} ());

