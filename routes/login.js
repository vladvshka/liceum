const express = require("express");
const loginRouter = express.Router();
const path = require("path");

const pupilModel = require("../models/pupil");

loginRouter.get("/", signIn);
loginRouter.get("/confirm-email/:confirmationUrl", confirmEmail);

function signIn(req, res, next) {
    console.log("sign-in");
    res.sendFile(path.join(__dirname, "../public/cabinetLogin/index.html"));
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