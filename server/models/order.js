module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paid_with: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderProduct, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
      as: 'order_products'
    });
  };

  return Order;
};
