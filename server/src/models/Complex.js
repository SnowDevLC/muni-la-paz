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
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },   
    tel:{
      type: DataTypes.STRING,
      allowNull: false,
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