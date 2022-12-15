'use strict';
const { db } = require('../db.js');
const supertest = require('supertest');
const server = require('../server.js');
const request = supertest(server.app);

describe('API Server', () => {
    it('handles requests to missing routs', async () => {
        const response = await request.get('/foo');
        expect(response.status).toEqual(404);
    });

    // it('handles errors', async () => {
    //   const response = await request.get('/bad');
    //   expect(response.status).toEqual(500);
    //   expect(response.body.route).toEqual('/bad');
    // });

    it('handles root path /', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Hello World');
    });

    it('handles API path /data', async () => {
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(typeof response.body).toEqual('object');
    });

    it('stamps routes with middleware', async () => {
        const response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(response.body.time).toBeDefined();
    });
});

// phase 2 tests

describe('CRUD tests', async () => {
    beforeEach(() => {
        db.sync();
    });

    it('creates data', async () => {
        let response = await request.post('/car').send({
            make: 'toyota',
            model: 'camry',
            color: 'blue',
        });
        expect(response.status).toBe(200);
        expect(response.body).toMatch({
            make: 'toyota',
            model: 'camry',
            color: 'blue',
        });
        it('gets a car', async () => {
            let req = await (await request.get('/car')).send({
                make: 'toyota',
                model: 'camry',
                color: 'blue',
            });
            expect(req).toBe(200);
            const id = req.body.id;
            let res = await request.get(`/car/${id}`);
            expect(res.status).toBe(200);
            expect(res).toMatch({
                id: id,
                make: 'toyota',
                model: 'camry',
                color: 'blue',
            });
            it('gets a list of cars', async () => {

            });
        });

    });
});