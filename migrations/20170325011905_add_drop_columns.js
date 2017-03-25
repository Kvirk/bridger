exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.dropColumn('site_standard_profile_request');
      table.dropColumn('api_standard_profile_request');
      table.dropColumn('specialties');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', (table) => {
      table.string('site_standard_profile_request');
      table.string('api_standard_profile_request');
      table.specificType('specialties', 'jsonb');
    })
  ])
};
