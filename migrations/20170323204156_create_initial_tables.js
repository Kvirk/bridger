exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('linkedin_id');
      table.string('first_name');
      table.string('last_name');
      table.string('email_address');
      table.string('headline');
      table.string('location');
      table.string('industry');
      table.string('current_share');
      table.integer('num_connections');
      table.text('summary');
      table.specificType('specialties', 'jsonb');
      table.string('positions');
      table.string('picture_url');
      table.string('site_standard_profile_request');
      table.string('api_standard_profile_request');
      table.string('public_profile_url');
      table.specificType('associations', 'jsonb');
      table.specificType('interests', 'jsonb');
      table.specificType('publications', 'jsonb');
      table.specificType('skills', 'jsonb');
      table.specificType('certifications', 'jsonb');
      table.specificType('educations', 'jsonb');
      table.specificType('courses', 'jsonb');
      table.specificType('volunteer', 'jsonb');
      table.specificType('three_current_positions', 'jsonb');
      table.specificType('three_past_positions', 'jsonb');
      table.specificType('following', 'jsonb');
      table.specificType('job_bookmarks', 'jsonb');
      table.specificType('suggestions', 'jsonb');
      table.specificType('honors_awards', 'jsonb');
    }),
    knex.schema.createTable('events', (table) => {
      table.increments();
      table.string('name');
      table.text('description');
      table.string('venue');
      table.timestamp('start_time');
      table.timestamp('end_time');
    }),
    knex.schema.createTable('event_users', (table) => {
      table.increments();
      table.integer('event_id').references('id').inTable('events').onDelete('CASCADE');
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    }),
    knex.schema.createTable('points', (table) => {
      table.increments();
      table.integer('user_id1').references('id').inTable('users').onDelete('CASCADE');
      table.integer('user_id2').references('id').inTable('users').onDelete('CASCADE');
      table.integer('points');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE users CASCADE'),
    knex.raw('DROP TABLE events CASCADE'),
    knex.raw('DROP TABLE event_users CASCADE'),
    knex.raw('DROP TABLE points CASCADE')
  ])
};
