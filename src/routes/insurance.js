const express = require('express');
const { Insurance } = require('../models/index');
const insuranceRoutes = express();

async function getPolicies(req, res) {
    const allPolicies = await Insurance.findAll();
    res.status(200).send(allPolicies);
}

async function getpolicy(req, res, next) {
    const policy = await Insurance.findOne({ where: { id: req.params.id } });
    if (policy === null) {
        next();
    }
    else {
        res.status(200).send(policy);
    }
}

async function deletePolicy(req, res, next) {
    const policy = await Insurance.findOne({ where: { id: req.params.id } });
    if (policy === null) {
        next();
    }
    else {
        policy.destroy();
        res.status(200).send('policy Deleted')
    }
}

async function createPolicy(req, res) {
    const companyName = req.body.companyName;
    const policyNumber = req.body.policyNumber;
    const policy = await Insurance.create({
        companyName,
        policyNumber,
    });
    res.status(200).send(policy);
}

async function updatePolicy(req, res, next) {
    let policy = await Insurance.findOne({ where: { id: req.params.id } });
    if (policy === null) {
        next();
    }
    else {
        let updatedPolicy = {
            companyName: req.body.companyName,
            policyNumber: req.body.policyNumber,
        }
        policy = await Insurance.update(updatedPolicy);
        res.status(200).send(policy);
    }
}

insuranceRoutes.get('/car/:id', getpolicy);
insuranceRoutes.get('/car', getPolicies);
insuranceRoutes.post('/car', createPolicy);
insuranceRoutes.put('/car/:id', updatePolicy);
insuranceRoutes.delete('/car/:id', deletePolicy);


module.exports = {
    insuranceRoutes,
}