exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return Promise.all([
        knex.raw('ALTER SEQUENCE events_id_seq RESTART'),
        knex('events').insert({
          name: 'Techvibes Techfest',
          description: 'A unique recruiting event. Techfest attracts up to 1,000 attendees, more than 300 career opportunities, and up to 15 hiring companies. Hiring company executives pitch a crowd of potential employees on why they’re the best employer in the room.',
          venue: 'Vancouver Convention Centre West, Vancouver, BC',
          picture_url: 'https://s3-us-west-2.amazonaws.com/techvibes/wp-content/uploads/2016/09/21190821/techfest.png',
          creator_name: 'Joel Shinness',
          creator_picture_url: 'http://www.joelshinness.com/assets/img/avatars/avatar_square_sm.jpg',
          start_time: new Date(2017, 4, 11, 1, 30),
          end_time: new Date(2017, 4, 11, 5, 00)
        }),
        knex('events').insert({
          name: 'The HTML500',
          description: 'The HTML500 is a one-day event where 50 of Canada\'s top tech companies come together to teach you and 499 other people how to code - for free! By the end of the day, you will have connected with over 100 developers and created your very own landing page using popular programming languages.',
          venue: 'Rocky Mountaineer Station, 1755 Cottrell St, Vancouver, BC V6A 2L8',
          picture_url: 'https://pbs.twimg.com/profile_images/808817858247622656/o4zLDGHB.jpg',
          creator_name: 'Don Burks',
          creator_picture_url: 'https://www.ntrust.com/wp-content/uploads/2015/07/Don-Burks-02.jpg',
          start_time: new Date(2017, 5, 21, 17, 00),
          end_time: new Date(2017, 5, 22, 5, 30)
        }),
        knex('events').insert({
          name: 'Disrupt HR YVR',
          description: 'DisruptHR is an information exchange designed to energize, inform and empower executives, business leaders and people in the HR field. DisruptHR is founded on the idea that all business leaders are indeed people leaders and therefore, together we need to be ready to take risks, question the status quo and explore new ways to DISRUPT how we work.',
          venue: 'Science World at TELUS World of Science, 1455 Quebec Street, Vancouver, BC V6A 3Z7',
          picture_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F29139752%2F194897233052%2F1%2Foriginal.jpg?w=800&rect=0%2C0%2C1050%2C525&s=328364308e2c9ff317ef1fb75715fc01',
          creator_name: 'The Corker Company',
          creator_picture_url: 'http://thecorkercompany.com/wp-content/uploads/2016/02/corker-co-header-logo.png',
          start_time: new Date(2017, 5, 15, 1, 30),
          end_time: new Date(2017, 5, 15, 4, 30)
        }),
        knex('events').insert({
          name: 'HackerNest Tech Social',
          description: 'HackerNest Tech Socials are a fun, relaxed way to connect with your local tech community. Atmosphere: chill, friendly, unpretentious, agenda-free (no sales pitch), and brimming with Ultra Smart People.',
          venue: 'Mobify HQ, #420 - 725 Granville Street, Vancouver, BC',
          picture_url: 'https://pbs.twimg.com/profile_images/669627228741746688/COn8VQKU.png',
          creator_name: 'HackerNest A.',
          creator_picture_url: 'https://a248.e.akamai.net/secure.meetupstatic.com/photos/member/2/c/c/6/member_93431462.jpeg',
          start_time: new Date(2017, 6, 21, 17, 00),
          end_time: new Date(2017, 6, 21, 22, 30)
        }),
        knex('events').insert({
          name: 'TALENT DAY: TECH PROFESSIONALS',
          description: 'Are you a Developer, QA, UX, Product or Project Manager looking for your next dream job, or simply looking to connect with the latest and greatest in local tech? ? Come to the BC Tech Innovation Hub -for the next Talent Day! Hosted by BC Tech Jobs in partnership with the BC Tech Association, Talent Day is an opportunity for technical professionals to network and connect with top notch tech companies in a casual setting.',
          venue: 'BC Tech Innovation Hub, 887 Great Northern Way, Vancouver, BC V5T 4T5',
          picture_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F29770135%2F168346030600%2F1%2Foriginal.jpg?w=800&rect=0%2C0%2C1024%2C512&s=af5b6a53acb880b3a0378d8baab41f34',
          creator_name: 'Tech Professionals',
          creator_picture_url: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAK_AAAAJDIxMTMzODc0LWU0MmQtNDBlOS04ZmIyLWMyMmFmMTNhZjU4MQ.png',
          start_time: new Date(2017, 3, 20, 00, 00),
          end_time: new Date(2017, 3, 20, 2, 30)
        }),
        knex('events').insert({
          name: '2017 BCIC-New Ventures Competition',
          description: 'Help us kick off the 2017 BCIC-New Ventures Competition this year from TELUS garden. Meet the NVBC community, connect with your fellow competitiors, and have the opportunity to hear from past participant, Ping Yao, CEO of Optigo Networks.',
          venue: 'TELUS Garden Flex Space, 755 Richards Street, Vancouver, BC V6B 3A6',
          picture_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F29105843%2F9825048257%2F1%2Foriginal.jpg?w=800&rect=0%2C15%2C1412%2C706&s=434e91507ed1b682ea39d6d4c80f30d7',
          creator_name: 'BCIC-New Ventures Competition',
          creator_picture_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F22841046%2F9825048257%2F5%2Flogo.png?h=160&w=160&s=91141160541baa8c8ad23dfdf1954312',
          start_time: new Date(2017, 7, 05, 00, 30),
          end_time: new Date(2017, 7, 05, 4, 30)
        }),
        knex('events').insert({
          name: 'BCIT Real Estate Association: Annual Industry Night',
          description: 'The BCIT Real Estate Association is pleased to invite you to our much anticipated Annual Industry Night! A night that allows past and present BCIT Real Estate students to meet and connect with professionals in the industry.',
          venue: 'Marriott Pinnacle Downtown Hotel, 1128 West Hastings Street, Vancouver, BC V6E 4J6',
          picture_url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F29963089%2F205875445345%2F1%2Foriginal.jpg?w=800&rect=0%2C68%2C1056%2C528&s=d81a7cfc8274ea44eb9110ec9fefe153',
          creator_name: 'BCIT Real Estate Association',
          creator_picture_url: 'https://pbs.twimg.com/profile_images/1116132883/Twitter4_400x400.jpg',
          start_time: new Date(2017, 3, 27, 1, 00),
          end_time: new Date(2017, 3, 27, 4, 00)
        })
      ]);
    });
};
