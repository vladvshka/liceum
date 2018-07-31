const express = require("express");
const loginApiRouter = express.Router();
const path = require("path");
const makeHash = require('object-hash');
const nodemailer = require("nodemailer");

const pupilModel = require("../../models/pupil");
const transporter = require("../../controllers/emailTransporter");
const config = require("../../config");

loginApiRouter.post("/sign-in", signIn);
loginApiRouter.post("/sign-up", signUp);
loginApiRouter.post("/forgot-password", forgotPassword);
loginApiRouter.get("/email-confirm", repeatEmail);
loginApiRouter.get("/check-cookie", checkCookie);

function signIn(req, res) {
    const pupil = req.body;
    const pwd = pupil.password
    console.log(pupil);

    pupilModel
        .findOne({
            email: pupil.email
        })
        .then(function (doc) {
            if (doc) {
                doc.comparePasswords(pwd, function (err, isMatch) {
                    if (err) {
                        res.status(500).send("Pupil not found in Db");
                    }

                    if (isMatch) {
                        //res.sendFile(path.join(__dirname, '../../public/cabinet/index.html'));
                        res.sendStatus(200);
                    } else {
                        res.sendStatus(401);
                    }

                });
            } else {
                res.status(404).send("User not found in Db");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB checking pupil error");
        });
}

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

function sendEmail(email, confirmationUrl, password) {
    console.log("email: ", email);
    console.log("url: ", confirmationUrl);
    //how to decrypt password?
    // const url = `${config.domain}/${confirmationUrl}`;

    // // setup email data with unicode symbols
    // const mailOptions = {
    //     from: config.mailOptions.from,
    //     subject: config.mailOptions.subjectConfirmEmail,
    //     to: email
    // };

    // if (!password) {
    //     mailOptions.subject = config.mailOptions.subjectConfirmEmail;
    //     mailOptions.text = `Для подтверждения почты перейдите по ссылке: `;
    //     mailOptions.html = `<a>${url}</a>`;
    // } else {
    //     mailOptions.subject = config.mailOptions.subjectForgottenPwd;
    //     mailOptions.text = `Ваш пароль: ${password}`;
    // }

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.error(error);
    //     }
    //     console.log('Message sent: %s', info.messageId);
    //     // Preview only available when sending through an Ethereal account
    //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // });
}

function makeCookie(email, id) {
    const options = {
        maxAge: 1000 * 60 * 360,
        signed: true
    };

    return ["pupil", id, options];
}

function repeatEmail(req, res, next) {
    if (req.signedCookies.pupil) {
        const id = req.signedCookies.pupil;

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
    console.log(req.signedCookies);
    console.log(req.cookies);

    if (req.signedCookies.pupil) {
        const id = req.signedCookies.pupil;
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

    const email = req.body.email;
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
            if (doc) {
                //send email with decrypted password
                res.status(200).json(email);
            } else {
                res.status(404).send("User not found in Db");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB finding pupil error");
        });
}

module.exports = loginApiRouter;