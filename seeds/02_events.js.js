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
          picture_url: 'http://www.lighthouselabs.ca/static-assets/lighthouse-labs.png',
          creator_name: 'David VanDusen',
          creator_picture_url: 'https://pbs.twimg.com/profile_images/552173019125145600/o7e-oT5m.jpeg',
          start_time: new Date("April 7, 2017 01:30:00"),
          end_time: new Date("April 7, 2017 04:00:00")
        }),
        knex('events').insert({
          name: 'Techvibes Techfest',
          description: 'A unique recruiting event. Techfest attracts up to 1,000 attendees, more than 300 career opportunities, and up to 15 hiring companies. Hiring company executives pitch a crowd of potential employees on why they’re the best employer in the room.',
          venue: 'Vancouver Convention Centre',
          picture_url: 'https://pbs.twimg.com/profile_images/743220658381824000/nC_-mGjU.jpg',
          creator_name: 'Joel Shinness',
          creator_picture_url: 'http://www.joelshinness.com/assets/img/avatars/avatar_square_sm.jpg',
          start_time: new Date("April 14, 2017 01:30:00"),
          end_time: new Date("April 14, 2017 04:30:00")
        }),
        knex('events').insert({
          name: 'The HTML500',
          description: 'The HTML500 is a one-day event where 50 of Canada\'s top tech companies come together to teach you and 499 other people how to code - for free! By the end of the day, you will have connected with over 100 developers and created your very own landing page using popular programming languages.',
          venue: 'Rocky Mountaineer Station, 1755 Cottrell St, Vancouver, BC V6A 2L8',
          picture_url: 'https://pbs.twimg.com/profile_images/808817858247622656/o4zLDGHB.jpg',
          creator_name: 'Don Burks',
          creator_picture_url: 'https://www.ntrust.com/wp-content/uploads/2015/07/Don-Burks-02.jpg',
          start_time: new Date("June 21, 2017 16:00:00"),
          end_time: new Date("June 22, 2017 05:00:00")
        })
      ]);
    });
};
