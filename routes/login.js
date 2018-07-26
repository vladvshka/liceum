const express = require('express');
const loginRouter = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

const pupilModel = require('../models/pupil');

loginRouter.get('/', signIn);
loginRouter.post('/', renderCabinet);
loginRouter.post('#/sign-up', signUp);
loginRouter.post('#/email-confirm', repeatEmail);
loginRouter.post('#/forgot-password', forgotPassword);
loginRouter.get('/:url', confirmEmail);

function signUp(req, res, next) {
    const pupil = req.body;
    const email = pupil.email;

    const transporter = nodemailer.createTransport(transport);
    const newPupil = new pupilModel(pupil);

    newPupil
        .save()
        .then(function (doc) {
            const {
                email,
                url,
                _id: id
            } = doc;

            sendEmail(email, url);
            const cookieParams = makeCookie(email, id);

            res.cookie(...cookieParams);
            res.send('/login/#/email-confirm');
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB saving error");
        });
}

function sendEmail(email, url) {
    console.log('email: ', email);
    console.log('url: ', url);
    // const data = `http://localhost:3000/login/confirm/${url}`;
    // transporter.sendMail(data);
}

function makeCookie(email, id) {
    let cookieData = {
        email,
        id
    }
    const options = {
        maxAge: 1000 * 60 * 360, // would expire after 6 h
    }
    cookieData = JSON.stringify(cookieData);

    return ['pupil', cookieData, options];
}

function renderCabinet(req, res, next) {
    console.log('render cabinet');
    console.log(req.body);

    //check user in DB

    //res.sendFile(path.join(__dirname, '../public/cabinet/index.html'));
}

function signIn(req, res, next) {
    console.log('sign-in');

    res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
}

function repeatEmail(req, res, next) {
    console.log('repeat email');

    const cookie = req.cookies.pupil;
    const email = req.body;
    //if id or email? in db - resend email

    res.sendStatus(200);
}

function forgotPassword(req, res, next) {
    console.log('forgot pwd');

    const email = req.body;
    //if email in db - render email confirm

    if (email) {
        res.send('/login/#/email-confirm');
    } else {
        res.status(404).send('No such user in DB');
    }
}

function confirmEmail(req, res, next) {
    console.log('confirm email');

    const url = req.params.url;
    //if url in db - render login

    if (url) {
        res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
    } else {
        res.status(404).send('No such user in DB');
    }
}

module.exports = loginRouter;