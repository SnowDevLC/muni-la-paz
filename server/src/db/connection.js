require("dotenv").config();
const { Sequelize } = require("sequelize");
const { UserModel, PublicationModel, ComplexModel } = require('../models');

const { loadData } = require('../seeder/loadData');

const sequelize = new Sequelize(process.env.DB, {
  logging: false,
  native: false,
  ssl: true,
});

UserModel(sequelize);
PublicationModel(sequelize);
ComplexModel(sequelize);

const { User, Publication, Complex } = sequelize.models;

Publication.belongsTo(User, { through: "user_publication", timestamps: false });
Complex.belongsTo(User, { through: "user_complex", timestamps: false });

const dbConnection = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("DB Connect");
    // await loadData(User, Publication, Complex);
  } catch (error) {
    throw new Error("Fail DB Connect");
  }
};

module.exports = { ...sequelize.models, dbConnection };

