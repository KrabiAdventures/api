module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        allowNull: false
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      adult_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      child_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      pickup_location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface) =>  queryInterface.dropTable('OrdersProducts'),
};
