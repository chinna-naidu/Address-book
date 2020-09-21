const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Address = sequelize.define('Address', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    address: {
        type:Sequelize.TEXT,
        allowNull:false
    },
    contactnumber: {
        type: Sequelize.CHAR(10),
        allowNull:false,
    },
    alternatenumber: {
        type: Sequelize.CHAR(10),
        allowNull:false,
    },

});

module.exports = Address;

