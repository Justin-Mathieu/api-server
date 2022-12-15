const { Sequelize } = require('sequelize');
const { carModel } = require('./carModel');
const { driverModel } = require('./driverModel');
const { insuranceModel } = require('./insuranceModel');

const DATABASE_URL =
    process.env.NODE_ENV === 'test'
        ? 'sqlite::memory:' : process.env.DATABASE_URL;

const CONNECTION_OPTIONS = process.env.NODE_ENV === 'test'
    ? {
        logging: false,
    }
    : {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    };

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);

const Car = carModel(sequelize);
const Driver = driverModel(sequelize);
const Insurance = insuranceModel(sequelize);

Driver.hasMany(Car)
Car.belongsTo(Driver);
Insurance.belongsTo(Driver);


module.exports = {
    sequelize,
    Car,
    Driver,
    Insurance
}