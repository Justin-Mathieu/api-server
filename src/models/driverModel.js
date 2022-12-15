const { DataTypes } = require('sequelize');

function driverModel(sequelize) {
    return sequelize.define('driver', {
        name: DataTypes.STRING,
        age: DataTypes.STRING
    });
}

module.exports = {
    driverModel
}