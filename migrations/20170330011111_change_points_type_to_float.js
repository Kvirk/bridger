
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points', (table) => {
      table.float('points').alter();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('points', (table) => {
      table.integer('points').alter();
    })
  ])
};
