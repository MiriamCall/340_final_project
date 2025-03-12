const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const role = require("./role"); // Import the role model to create the foreign key

const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: role,
      key: "id",
    },
  },
});

//set up the association with the role model
user.belongsTo(role, { foreignKey: "role_id", as: "role" });

//ensure the table exists in the database
user
  .sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) =>
    console.log("Error, did you enter wrong database credentials?")
  );

module.exports = user;
