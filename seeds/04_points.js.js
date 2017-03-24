exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw('ALTER SEQUENCE points_id_seq RESTART'),
        knex('points').insert({
          user_id1: 1,
          user_id2: 2,
          points: 60
        }),
        knex('points').insert({
          user_id1: 1,
          user_id2: 3,
          points: 20
        }),
        knex('points').insert({
          user_id1: 1,
          user_id2: 4,
          points: -30
        }),
        knex('points').insert({
          user_id1: 2,
          user_id2: 3,
          points: 100
        }),
        knex('points').insert({
          user_id1: 2,
          user_id2: 4,
          points: -50
        })
      ]);
    });
};
