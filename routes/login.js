const express = require('express');
const loginRouter = express.Router();
const path = require('path');

const pupilModel = require('../models/pupil');

loginRouter.post('/sign-up', signUp);

function signUp(req, res, next) {
    const pupil = req.body;
    const newPupil = new pupilModel(pupil);

    newPupil
        .save()
        .then(function (doc) {
            res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB saving error");
        });
}

module.exports = loginRouter;