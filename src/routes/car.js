const express = require('express');
const { Car } = require('../models/index');
const carRoutes = express();

async function getCars(req, res) {
    const allCars = await Car.findAll();
    res.status(200).send(allCars);
}

async function getCar(req, res, next) {
    const car = await Car.findOne({ where: { id: req.params.id } });
    if (car === null) {
        next();
    }
    else {
        res.status(200).send(car);
    }
}

async function deleteCar(req, res, next) {
    const car = await Car.findOne({ where: { id: req.params.id } });
    if (car === null) {
        next();
    }
    else {
        car.destroy();
        res.status(200).send('Car Deleted')
    }
}

async function createCar(req, res) {
    const make = req.body.make;
    const model = req.body.model;
    const color = req.body.color;
    const car = await Car.create({
        make,
        model,
        color,
    });
    res.status(200).send(car);
}

async function updateCar(req, res, next) {
    let car = await Car.findOne({ where: { id: req.params.id } });
    if (car === null) {
        next();
    }
    else {
        let updatedCar = {
            make: req.body.model,
            model: req.body.model,
            color: req.body.color,
        }
        car = await car.update(updatedCar);
        res.status(200).send(car);
    }
}

carRoutes.get('/car/:id', getCar);
carRoutes.get('/car', getCars);
carRoutes.post('/car', createCar);
carRoutes.put('/car/:id', updateCar);
carRoutes.delete('/car/:id', deleteCar);


module.exports = {
    carRoutes,
}