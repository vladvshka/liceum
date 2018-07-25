const express = require('express');
const loginRouter = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');

const pupilModel = require('../models/pupil');

loginRouter.post('/', signUp);
loginRouter.get('/', signIn);
loginRouter.get('/send-email', generateEmail);
loginRouter.get('/confirm/:id', confirmEmail);

function signUp(req, res, next) {
    const pupil = req.body;
    const email = pupil.email;
    console.log(email);

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
            res.send('/login/#/email-sent');
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB saving error");
        });

    //send email
}

function sendEmail(email, url) {
    console.log('email: ', email);
    console.log('url: ', url);
    // const data = `http://localhost:3000/login/confirm/${url}`;
    // transporter.sendMail(data);
}

function makeCookie(email, id) {
    // console.log('email: ', email);
    // console.log('url', url);
    let cookieData = {
        email,
        id
    }

    const options = {
        maxAge: 1000 * 60 * 360, // would expire after 6 h
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    }

    cookieData = JSON.stringify(cookieData);

    return ['pupil', cookieData, options];
}

function signIn(req, res, next) {
    console.log('hi');

    res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
}

function generateEmail(req, res, next) {
    console.log('hi');

    res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
}

function confirmEmail(req, res, next) {
    console.log('hi');

    res.sendFile(path.join(__dirname, '../public/cabinetLogin/index.html'));
}

module.exports = loginRouter;