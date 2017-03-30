exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw('ALTER SEQUENCE events_id_seq RESTART'),
        knex('events').insert({
          name: 'Lighthouse Labs Demo Day',
          description: 'Come enjoy the final projects! Everybody welcome, employers and families.',
          venue: 'Lighthouse Labs',
          creator_name: 'David',
          creator_picture_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAsjAAAAJDhmYzBmNDU0LTNlZTAtNGZmNi1iMmE4LTIzYzZjNTRiOWRlZQ.jpg',
          start_time: new Date(),
          end_time: new Date()
        }),
        knex('events').insert({
          name: 'Techvibes Techfest',
          description: 'A unique recruiting event. Techfest attracts up to 1,000 attendees, more than 300 career opportunities, and up to 15 hiring companies. Hiring company executives pitch a crowd of potential employees on why they’re the best employer in the room.',
          venue: 'Vancouver Convention Centre',
          creator_name: 'David',
          creator_picture_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAsjAAAAJDhmYzBmNDU0LTNlZTAtNGZmNi1iMmE4LTIzYzZjNTRiOWRlZQ.jpg',
          start_time: new Date(),
          end_time: new Date()
        })
      ]);
    });
};
