const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.DECIMAL(10, 2), //allows prices with up to 2 decimal places
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
});

Product.sync()
  .then(() => console.log("Product table created successfully"))
  .catch((err) =>
    console.log("Error, did you enter wrong database credentials?")
  );

module.exports = Product;
