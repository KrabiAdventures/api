module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Unavailabilities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateFrom: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      dateTo: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      productId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Products',
          key: 'id',
          as: 'productId',
        },
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
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Unavailabilities'),
};