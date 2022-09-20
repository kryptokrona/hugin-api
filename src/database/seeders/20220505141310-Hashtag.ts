'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'hashtag',
      [
        {
          id: 1,
          name: 'kryptokrona',
        },
        {
          id: 2,
          name: 'hugin',
        },
        {
          id: 3,
          name: 'crypto',
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('hashtag', null, {}),
}