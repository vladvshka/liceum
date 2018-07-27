const express = require("express");
const loginRouter = express.Router();
const path = require("path");
const nodemailer = require("nodemailer");
const makeHash = require('object-hash');

const pupilModel = require("../../models/pupil");

loginRouter.get("/", signIn);
loginRouter.post("/", renderCabinet);
loginRouter.post("/sign-up", signUp);
loginRouter.get("/email-confirm", repeatEmail);
loginRouter.post("/forgot-password", forgotPassword);
loginRouter.get("/confirm-email/:confirmationUrl", confirmEmail);

function signIn(req, res, next) {
    console.log("sign-in");

    res.sendFile(path.join(__dirname, "../../public/cabinetLogin/index.html"));
}

function renderCabinet(req, res) {
    const pupil = req.body;
    const pwd = pupil.password

    pupilModel
        .findOne({
            email: pupil.email
        })
        .then(function (doc) {
            if (doc) {
                // test a matching password
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
    let cookieData = id;
    const options = {
        maxAge: 1000 * 60 * 360 // would expire after 6 h
        //signed: true
    };
    cookieData = JSON.stringify(cookieData);

    return ["pupil", cookieData, options];
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

function forgotPassword(req, res, next) {
    console.log("forgot pwd");
    //generate url
    //change status?
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
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB finding pupil error");
        });
}

function confirmEmail(req, res, next) {
    console.log("confirm email");
    const confirmationUrl = req.params.confirmationUrl;

    pupilModel
        .find({
            confirmationUrl: confirmationUrl
        })
        .then(function (doc) {
            res.redirect("#/succcess");
            res.sendFile(
                path.join(__dirname, "../../public/cabinetLogin/index.html")
            );
        })
        .catch(function (err) {
            console.error(err);
            res.status(404).send("No such user in DB");
        });
}

module.exports = loginRouter;