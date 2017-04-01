const settings = require("../settings"); // settings.json
const knexSettings = require("../knexfile.js");
require('dotenv').config()
let connection = knexSettings.development;

if (process.env.NODE_ENV === 'production'){
  connection = knexSettings.production;
}

const knex = require('knex')(
  connection);

  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: process.env.ELASTIC_URL,
    auth: '${process.env.ELASTIC_URL}:${process.env.ELASTIC_URL}',
    log: 'error'
  });

  // const esClient = new elasticsearch.Client({
  //   host: '127.0.0.1:9200',
  //   log: 'error'
  // });

  const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });

      bulkBody.push(item);
    });

    return esClient.bulk({body: bulkBody})

    // esClient.bulk({body: bulkBody})
    // .then(response => {
    //   let errorCount = 0;
    //   response.items.forEach(item => {
    //     if (item.index && item.index.error) {
    //       console.log(++errorCount, item.index.error);
    //     }
    //   });
    //   console.log(`Successfully indexed ${data.length - errorCount} out of ${data.length} items`);
    // })
    // .catch(console.err);
  };

  const queryAllUsers = () => {
   return  knex.select().from('users')
  }

  // only for testing purposes
  // all calls should be initiated through the module
  const indexing = (data) => {
    // knex.select().table('users').then(function(data) {
    //   // const articles = JSON.parse(data);
    console.log(`${data.length} items parsed from data file`);
    return  bulkIndex('users', 'profile', data)
    // });
    // , function() {
    //   console.log("this is error");
    // });
  };

  module.exports = {
    indexing,
    queryAllUsers
  };
