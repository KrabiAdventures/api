module.exports = (sequelize, DataTypes) => {
  const Unavailability = sequelize.define('Unavailability', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_to: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    date_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true
  });

  Unavailability.associate = (models) => {
    Unavailability.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
    });
  };

  return Unavailability;
};