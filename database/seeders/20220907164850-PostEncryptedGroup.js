'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'post_encrypted_group',
      [
        {
          id: 1,
          tx_hash: 'c077967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
          tx_sb: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
          tx_timestamp: '0',
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
        {
          id: 2,
          tx_hash: 'c087967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
          tx_sb: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
          tx_timestamp: '0',
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
        {
          id: 3,
          tx_hash: 'c097967136518addd60ec558275aa8066aa1e17280423e405cd570e405a0e00f',
          tx_sb: '014840233e2677412a6d9594cffd2107d74376030f0eb1b06908614dfbffc4719d',
          tx_timestamp: '0',
          created_at: new Date(0).toISOString(),
          updated_at: new Date(0).toISOString(),
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post_encrypted_group', null, {})
  }
};
