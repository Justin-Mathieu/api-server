const { DataTypes } = require('sequelize');

function carModel(sequelize) {
    return sequelize.define('car', {
        make: DataTypes.STRING,
        model: DataTypes.STRING,
        color: DataTypes.STRING
    });
}

module.exports = {
    carModel
}