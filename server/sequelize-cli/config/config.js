require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DB',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DB',
    dialect: 'postgres',
  }
};