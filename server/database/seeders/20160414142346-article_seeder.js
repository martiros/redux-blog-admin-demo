'use strict';

const faker = require('faker');

module.exports = {
  up(queryInterface) {
    const articles = [];
    const now = new Date();
    for (let i = 0; i < 20; i++) {
      const createdAt = faker.date.past();
      articles.push({
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
        createdAt,
        updatedAt: faker.date.between(createdAt, now),
      });
    }

    return queryInterface.bulkInsert('article', articles, {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('article', null, {});
  },
};
