var sequelize = require('sequelize');
var constants = require('./../constants.js');
module.exports = new sequelize(constants.DATABASE_NAME,constants.DATABASE_USERNAME,constants.DATABASE_PASSWORD,{
  host: constants.DATABASE_HOST,
  dialect: 'postgres',

  pool: {
    max: 20,
    min: 5,
    idle: 10000
  }
});
