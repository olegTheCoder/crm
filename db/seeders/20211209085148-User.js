module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      login: 'admin',
      password: 'admin',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
