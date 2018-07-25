const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/', function (req, res, next) {
    const token = req.cookies;

    res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
});

module.exports = router;