const { logger } = require('../middleware/logger.js');

describe('logger middleware test', () => {
    it('logs in the console', () => {
        jest.spyOn(console, 'log').mockImplementation();
        const req = { method: 'GET', URL: '/' };
        const res = {};
        const next = () => { };
        jest.fn(req, res, next);


        expect(console.log).toHaveBeenCalledWith('GET', '/');

        expect(console.log).toHaveBeenCalledWith('GET', '/data');

        expect(console.log).toHaveBeenCalledWith('GET', '/person');

    });

});