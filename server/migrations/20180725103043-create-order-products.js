module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    }),
  down: (queryInterface) =>  queryInterface.dropTable('OrdersProducts'),
};
