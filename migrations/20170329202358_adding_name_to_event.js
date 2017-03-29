
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.string('creator_name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('creator_name');
    })
  ])
};
