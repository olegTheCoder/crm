module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      deliveryCost: {
        type: Sequelize.INTEGER,
      },
      setupCost: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.STRING,
      },
      deliveryDate: {
        type: Sequelize.STRING,
      },
      setupDate: {
        type: Sequelize.STRING,
      },
      courierTeam: {
        type: Sequelize.STRING,
      },
      setupTeam: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
