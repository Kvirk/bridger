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
          event_id: 1,
          user_id: 7
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 8
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 9
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 10
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 11
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 12
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 13
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 14
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 15
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 16
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 17
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 18
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 19
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 20
        }),
        knex('event_users').insert({
          event_id: 1,
          user_id: 21
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
        })
      ]);
    });
};
