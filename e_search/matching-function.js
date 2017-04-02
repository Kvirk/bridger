const elasticSearch = require ('./search-match.js');

  const knexSettings = require("../knexfile.js");
  require('dotenv').config()
  const settings = require("../settings"); // settings.json
  let connection = knexSettings.development;

  if (process.env.NODE_ENV === 'production'){
    connection = knexSettings.production;
  }

  const knex = require('knex')(
    connection);

let resultCollection = [];

let handleError = (err) => {
  console.log(err);
}

const insertNewPair = (updateResults, matchResults, userId) => {
  let allPromises = [];
  let matchResultsIndex = 0;
  updateResults.forEach((result) => {
    if(result.rowCount === 0) {
      allPromises.push(
        knex('points').insert({
          user_id1: userId,
          user_id2: matchResults[matchResultsIndex].user_id2,
          points: matchResults[matchResultsIndex].score
        })
      );
    }
    matchResultsIndex++;
  })
  if (allPromises.length >= 0) {
    return Promise.all(allPromises);
  } else {
    return null
  }
};

const updateUserPoints = (matchResults, userId) => {
  let allPromises = [];
  console.log("User id --->", userId);
  matchResults.hits.hits.forEach((hit, index) => {
    console.log("User id", hit._source.id);
    console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
    allPromises.push(
      knex.raw('UPDATE points SET points = points + ? WHERE user_id1=? AND user_id2=?', [hit._score, userId, hit._source.id])
    );
  });
  return Promise.all(allPromises);
};


// const consumeResult = (results) => {
//   console.log(`found ${results.hits.total} items in ${results.took}ms`);
//   if (results.hits.total > 0) {
//     results.hits.hits.forEach((hit, index) => {
//       console.log("User id", hit._source.id);
//       console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
//       let searchResult = {
//         userId: hit._source.id,
//         matchingScore: hit._score
//       }
//     });
//   }
// };

const findUserById = (userLinkedInId) => {
  return knex.select().from('users').where('linkedin_id', userLinkedInId)
};

const runMatching = (user) => {
  console.log("User is -->", user[0]);
  let queryValue = user[0];
  return elasticSearch.invokeSearch(queryValue, ['summary', 'industry'])
};

// runMatching();

module.exports = {
  findUserById,
  runMatching,
  // consumeResult,
  insertNewPair,
  updateUserPoints
};
