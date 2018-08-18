module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('unavailabilities', {
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
      date_from: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      date_to: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      product_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
          as: 'product_id',
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
  down: (queryInterface) => queryInterface.dropTable('unavailabilities'),
};