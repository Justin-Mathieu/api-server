const supertest = require('supertest');
const { validator } = require('../src/middleware/validator');
const server = require('../server.js');
const request = supertest(server.app);


describe('validator middleware test', () => {
    it('checks for query', () => {
        const response = request.get('/person');

        expect(response.status).toBe('404');
    });

});
