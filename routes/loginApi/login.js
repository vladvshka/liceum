const express = require("express");
const loginApiRouter = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
const makeHash = require('object-hash');

const pupilModel = require("../../models/pupil");

loginApiRouter.post("/sign-up", signUp);
loginApiRouter.post("/forgot-password", forgotPassword);
loginApiRouter.get("/email-confirm", repeatEmail);
loginApiRouter.get("/check-cookie", checkCookie);
loginApiRouter.get("/email-verified", checkCookie);

function signUp(req, res, next) {
    const pupil = req.body;
    const email = pupil.email;

    pupilModel
        .findOne({
            email: email
        })
        .then(function (doc) {
            if (doc) {
                //status?
                res.status(500).send("User with such email already exists");
            } else {
                addNewPupil(pupil, res);
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB checking pupil error");
        });
}

function addNewPupil(pupil, res) {
    //const transporter = nodemailer.createTransport(transport);
    const newPupil = new pupilModel(pupil);

    newPupil
        .save()
        .then(function (doc) {
            const {
                email,
                confirmationUrl,
                _id: id
            } = doc;

            sendEmail(email, confirmationUrl);
            const cookieParams = makeCookie(email, id);

            res.cookie(...cookieParams);
            res.status(200).json(email);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB saving pupil error");
        });
}

function sendEmail(email, confirmationUrl) {
    console.log("email: ", email);
    console.log("url: ", confirmationUrl);
    // const data = `http://localhost:3000/login/confirm/${confirmationUrl}`;
    // transporter.sendMail(data);
}

function makeCookie(email, id) {
    const options = {
        maxAge: 1000 * 60 * 360 // would expire after 6 h
        //signed: true
    };

    return ["pupil", id, options];
}

function repeatEmail(req, res, next) {
    console.log("repeat email");

    if (req.cookies.pupil) {
        const id = req.cookies.pupil;

        pupilModel
            .findById({
                _id: id
            })
            .then(function (doc) {
                if (doc) {
                    //if confirmationUrl is not null and status===virgin?
                    if (doc.status === "virgin" && doc.confirmationUrl) {
                        sendEmail(doc.email, doc.confirmationUrl);
                        res.sendStatus(200);
                    } else {
                        res.status(401).send("User has already confirmed email");
                    }
                } else {
                    res.status(404).send("User not found in Db");
                }
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("DB finding pupil error");
            });
    } else {
        res.status(401).send("User without cookie");
    }
};

function checkCookie(req, res, next) {
    console.log("checking email");

    if (req.cookies.pupil) {
        const id = req.cookies.pupil;
        console.log(id);

        pupilModel
            .findById(id)
            .then(function (doc) {
                if (doc) {
                    res.status(200).json(doc.email);
                } else {
                    res.status(404).send("User not found in Db");
                }
            })
            .catch(function (err) {
                console.error(err);
                res.status(500).send("DB finding pupil error");
            });
    } else {
        res.status(401).send("User without cookie");
    }
}

function forgotPassword(req, res, next) {
    console.log("forgot pwd");

    const email = req.body;
    const newHash = makeHash({
        email: email
    });
    const update = {
        status: "forgottenPassword",
        confirmationUrl: newHash
    };

    pupilModel
        .findOneAndUpdate({
                email: email
            },
            update
        )
        .then(function (doc) {
            //send email
            res.status(200).json(email);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB finding pupil error");
        });
}

module.exports = loginApiRouter;