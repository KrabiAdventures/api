module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    adult_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    child_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pickup_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true
  });

  OrderProduct.associate = (models) => {
    OrderProduct.belongsTo(models.Order, {
      foreignKey: 'OrderId',
      onDelete: 'CASCADE',
      unique: false
    });
    OrderProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      unique: false
    });
  };

  return OrderProduct;
};
