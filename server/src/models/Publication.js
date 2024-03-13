const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Publication', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("General", "Evento", "Salud", "Institucional", "Deporte", "Concejo", "Servicio", "Turismo", "Cultura"),
      allowNull: false,
      defaultValue: "General"
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ""
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    isEvent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['']
    },
    check: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, { timestamps: false });
};