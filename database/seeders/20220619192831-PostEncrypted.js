'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
      queryInterface.bulkInsert(
          'post_encrypted',
          [
            {
                id: 1,
                tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                createdAt: new Date(0),
                updatedAt: new Date(0),
            },
            {
                id: 2,
                tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                createdAt: new Date(0),
                updatedAt: new Date(0),
            },
            {
                id: 3,
                tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
                tx_box: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
                tx_timestamp: '0',
                createdAt: new Date(0),
                updatedAt: new Date(0),
            },
          ],
          {}
      ),
  down: (queryInterface, Sequelize) =>
      queryInterface.bulkDelete('post_encrypted', null, {}),
}
