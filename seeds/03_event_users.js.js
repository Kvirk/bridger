exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('event_users').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw('ALTER SEQUENCE event_users_id_seq RESTART'),
        knex('event_users').insert({
          event_id: 1,
          user_id: 1
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 2
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 3
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 4
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 5
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 6
        }),
        knex('event_users').insert({
          event_id: 2,
          user_id: 1
        }),
        knex('event_users').insert({
          event_id: 2,
          user_id: 2
        }),
        knex('event_users').insert({
          event_id: 2,
          user_id: 3
        }),
        knex('event_users').insert({
          event_id: 2,
          user_id: 4
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 4
        })
      ]);
    });
};
