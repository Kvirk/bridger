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

let handleError = (err) => {
  console.log(err);
  knex.destroy();
}

let updateUserPoints = (matchResult) => {
  console.log("Updating points...");
  knex('points').where({
    user_id1: 2,
    user_id2: matchResult.userId
  }).increment('points', matchResult.matchingScore)
  .then((result) => {
    console.log('Update result', result);
    if (result === 0) {
      knex('points').returning('points').insert({
        user_id1: 2,
        user_id2: matchResult.userId,
        points: matchResult.matchingScore
      }).then((output) => {
        console.log("Output: ", output);
      }, handleError);
    }
  }, handleError);
};

let consumeResult = (results) => {
  console.log(`found ${results.hits.total} items in ${results.took}ms`);
  if (results.hits.total > 0) {
    results.hits.hits.forEach((hit, index) => {
      console.log("User id", hit._source.id);
      console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
      let searchResults = {
        userId: hit._source.id,
        matchingScore: hit._score
      }
      updateUserPoints(searchResults);
    });
  }
};

knex.select().from('users').where('id', 2)
  .then((user) => {
    let queryValue = user[0].industry;
    elasticSearch.invokeSearch(queryValue, ['summary', 'industry'])
      .then(consumeResult, handleError);
  });
