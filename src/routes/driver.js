const express = require('express');
const { Driver, } = require('../models/index');
const driverRoutes = express();

async function getDrivers(req, res) {
    const allDrivers = await Driver.findAll();
    res.status(200).send(allDrivers);
}

async function getDriver(req, res, next) {
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (driver === null) {
        next();
    }
    else {
        res.status(200).send(driver);
    }
}

async function deleteDriver(req, res, next) {
    const driver = await Driver.findOne({ where: { id: req.params.id } });
    if (driver === null) {
        next();
    }
    else {
        driver.destroy();
        res.status(200).send('driver Deleted')
    }
}

async function createDriver(req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const driver = await Driver.create({
        name,
        age,
    });
    res.status(200).send(driver);
}

async function updateDriver(req, res, next) {
    let driver = await Driver.findOne({ where: { id: req.params.id } });
    if (driver === null) {
        next();
    }
    else {
        let updatedDriver = {
            name: req.body.name,
            age: req.body.age,
        }
        driver = await driver.update(updatedDriver);
        res.status(200).send(driver);
    }
}

driverRoutes.get('/car/:id', getDriver);
driverRoutes.get('/car', getDrivers);
driverRoutes.post('/car', createDriver);
driverRoutes.put('/car/:id', updateDriver);
driverRoutes.delete('/car/:id', deleteDriver);


module.exports = {
    driverRoutes,
}