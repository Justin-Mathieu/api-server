function validator(req, res, next) {
    if (req.params.name) {
        res.status(200).send({ name: req.params.name })
    }
    else {
        res.status(500).send('not found');
    }
}

module.exports = {
    validator
}