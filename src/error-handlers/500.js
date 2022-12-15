function error500(error, req, res, next) {
    res.status(500).send({
        error: 500,
        route: req.path,
        query: req.query,
        body: req.body,
        message: 'server errror',
    });
}

module.exports = {
    error500
}