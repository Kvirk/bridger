let elasticSearch = require ('./search-match.js');

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

let aggregateResults = [];

function collectResults(queryResults) {
  console.log('------->', queryResults);
  aggregateResults.push(queryResults);
  // console.log('Aggregated Results', aggregateResults);
}

let consumeResult = (results) => {
  // let searchResults = [];
  console.log(`found ${results.hits.total} items in ${results.took}ms`);
  if (results.hits.total > 0) {
    results.hits.hits.forEach((hit, index) => {
      console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
      // searchResults.push({
      //   linkedin_id: hit._source.linkedin_id,
      //   matching_score: hit._score
      // });
      let searchResults = {
        linkedin_id: hit._source.linkedin_id,
        matching_score: hit._score
      }
      collectResults(searchResults);
    });
  }
};


elasticSearch.invokeSearch('Software Engineer', ['summary', 'industry'])
.then(consumeResult, (err) => {
  console.log(err);
});

