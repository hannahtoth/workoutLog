const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:LaCroix94@localhost:5432/workoutLog");

module.exports = sequelize;