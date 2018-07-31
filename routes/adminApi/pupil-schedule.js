const express = require("express");
const router = express.Router();

const model = require("../../models/pupil-schedule");

router.get("/pupil-schedule", getItems);

function getItems(req, res, next) {
    model.findAll(req, res, next);
}

module.exports = router;