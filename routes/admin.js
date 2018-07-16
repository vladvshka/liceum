const express = require('express');
const router = express.Router();
const path    = require("path");

router.get('/', function(req, res, next) {
    // console.log(`${__dirname}/../public`);
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

module.exports = router;