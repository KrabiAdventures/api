module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adult_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    child_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    itinerary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.Unavailability, {
      foreignKey: 'productId',
      as: 'unavailabilities',
    });
	Product.belongsToMany(models.Order, {
		through: OrderProduct
	});
  };

  return Product;
};
