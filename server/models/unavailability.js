module.exports = (sequelize, DataTypes) => {
  const Unavailability = sequelize.define('Unavailability', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Unavailability.associate = (models) => {
    Unavailability.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  };

  return Unavailability;
};