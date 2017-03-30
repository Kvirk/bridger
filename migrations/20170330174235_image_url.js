exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.string('picture_url');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', (table) => {
      table.dropColumn('picture_url');
    })
  ])
};
