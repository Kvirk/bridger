const elasticSearch = require ('./search-match.js');

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

let resultCollection = [];

let handleError = (err) => {
  console.log(err);
}

const updateUserPoints = (matchResults) => {
  let allPromises = [];
  matchResults.hits.hits.forEach((hit) => {
    allPromises.push(
    knex.raw('UPDATE points SET points = points + ? WHERE user_id1=2 AND user_id2=?', [hit._score, hit._source.id])
      .then((result) => {
        console.log("After update --->", result);
        if(result.rowCount === 0) {
          knex('points').insert({
            user_id1: 2,
            user_id2: hit._source.id,
            points: hit._score
          })
          .then((result) => {
            console.log("adding new entries --->", result);
          })   
        }
      })
    );
  });
  return Promise.all(allPromises);
};


const consumeResult = (results) => {
  console.log(`found ${results.hits.total} items in ${results.took}ms`);
  if (results.hits.total > 0) {
    results.hits.hits.forEach((hit, index) => {
      console.log("User id", hit._source.id);
      console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
      let searchResult = {
        userId: hit._source.id,
        matchingScore: hit._score
      }
    });
  }
};

const findUserById = (userId) => {
  return knex.select().from('users').where('id', userId)
};

const runMatching = (user) => {
  let queryValue = user[0].summary;
  return elasticSearch.invokeSearch(queryValue, ['summary', 'industry'])
};

// runMatching();

module.exports = {
  findUserById,
  runMatching,
  consumeResult,
  updateUserPoints
};