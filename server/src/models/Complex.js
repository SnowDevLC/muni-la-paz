const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Complex', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    lat:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: -32.2172425800549
    },
    lng:{
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: -65.04836357980413
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },   
    tel:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    instagram:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    web:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    check: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, { timestamps: false });
};