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

callback = function(index, user_id1, user_id2, matchResults, result2){
  if(!result2[0]){
    knex('points').insert({
      user_id1,
      user_id2,
      points: matchResults[index].score
    })
  }
}

const insertNewPair = (updateResults, matchResults, userId) => {
  let allPromises = [];
  updateResults.forEach((result, matchResultsIndex) => {
    if(result.rowCount === 0) {
      let user_id1 = userId;
      let user_id2 = matchResults[matchResultsIndex].user_id2;
      if(userId > matchResults[matchResultsIndex].user_id2){
        user_id2 = userId;
        user_id1 = matchResults[matchResultsIndex].user_id2;
      }
      if (user_id1 != user_id2) {
        let funInsert = callback.bind(null, matchResultsIndex, user_id1, user_id2, matchResults)
        allPromises.push(
          knex.from('points').where('user_id1', user_id1)
          .andWhere('user_id2', user_id1)
          .then(funInsert)
        );
      }
    }
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
    let user_id1 =  userId;
    let user_id2 = hit._source.id;
    if(userId > hit._source.id){
      user_id2 = userId;
      user_id1 = hit._source.id;
    }
    console.log("User id", hit._source.id);
    console.log(`\t ${++index} - ${hit._source.first_name} - ${hit._source.linkedin_id} \n Summary: ${hit._source.summary} \n Industry: ${hit._source.industry} \n Score: ${hit._score} \n`);
    if (user_id1 != user_id2) {
      allPromises.push(
        knex.raw('UPDATE points SET points = points + ? WHERE user_id1=? AND user_id2=?', [hit._score, user_id1, user_id2])
      );
    }
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
  return elasticSearch.invokeSearch(queryValue)
};

// runMatching();

module.exports = {
  findUserById,
  runMatching,
  // consumeResult,
  insertNewPair,
  updateUserPoints
};
