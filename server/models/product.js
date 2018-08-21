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
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true
  });

  Product.associate = (models) => {
    Product.hasMany(models.Unavailability, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      as: 'unavailabilities'
    });
    
    Product.hasMany(models.OrderProduct, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      as: 'order_products'
    });
  };

  return Product;
};
