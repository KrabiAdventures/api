module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('orderProducts', {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'items',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    })
      .then(() => {
        queryInterface.addConstraint('orderproducts', ['productId', 'orderId'], {
          type: 'primary key',
          name: 'orderproduct_pkey'
        });
      }),
  down: (queryInterface) =>  queryInterface.dropTable('orderProducts'),
};
