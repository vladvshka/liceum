const express = require("express");
const loginRouter = express.Router();
const path = require("path");

const pupilModel = require("../models/pupil");

loginRouter.get("/", signIn);
loginRouter.get("/confirm-email/:confirmationUrl", confirmEmail);
loginRouter.post("/", renderCabinet);

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

function signIn(req, res, next) {
    console.log("sign-in");
    res.sendFile(path.join(__dirname, "../../public/cabinetLogin/index.html"));
}

function confirmEmail(req, res, next) {
    console.log("confirm email");
    const confirmationUrl = req.params.confirmationUrl;
    const update = {
        status: "verified",
        confirmationUrl: ''
    };

    pupilModel
        .findOneAndUpdate({
                confirmationUrl: confirmationUrl
            },
            update
        )
        .then(function (doc) {
            res.redirect("/login/api/#/email-verified");
        })
        .catch(function (err) {
            console.error(err);
            res.redirect("/login/api");
        });
}

module.exports = loginRouter;