const express = require('express');
const cabinetRouter = express.Router();
const path = require("path");

cabinetRouter.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/cabinet/index.html'));

});

module.exports = cabinetRouter;