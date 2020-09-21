const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('address','root','chinna', {
    dialect:'mysql',
    host:'localhost'
});

module.exports = sequelize;

