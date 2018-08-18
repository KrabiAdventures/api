module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {
    tableName: 'categories',
    timestamps: true,
    underscored: true
  });

  Category.associate = () => {
    //
  };

  return Category;
};
