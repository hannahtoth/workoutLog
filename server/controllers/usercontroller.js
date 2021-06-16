const Express = require("express");
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hi Justin / Amit! This is my practice route!')
});

module.exports.router;