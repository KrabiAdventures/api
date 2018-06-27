module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paid_with: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Order.associate = () => {
    //
  };

  return Order;
};
