const express = require('express');
const cabinetRouter = express.Router();
const path = require("path");

cabinetRouter.get('/', getCabinet);

function getCabinet(req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/cabinet/index.html'));
}

module.exports = cabinetRouter;