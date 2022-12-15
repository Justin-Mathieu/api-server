const { DataTypes } = require('sequelize');

function insuranceModel(sequelize) {
    return sequelize.define('insurance', {
        companyName: DataTypes.STRING,
        policyNumber: DataTypes.NUMBER,
    });
}


module.exports = {
    insuranceModel
}