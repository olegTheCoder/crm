const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Client, { foreignKey: 'clientId' });
    }
  }
  Order.init({
    orderNumber: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    type: DataTypes.STRING,
    price: DataTypes.INTEGER,
    deliveryCost: DataTypes.INTEGER,
    setupCost: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    deliveryDate: DataTypes.STRING,
    setupDate: DataTypes.STRING,
    courierTeam: DataTypes.STRING,
    setupTeam: DataTypes.STRING,
    status: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
