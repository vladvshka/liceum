const express = require("express");
const router = express.Router();

const model = require("../../models/pupil-schedule");

router.get("/pupil-schedule", getItems);

function getItems(req, res, next) {
    model
        .find({})
        .populate({
            path: 'pupilId',
            select: 'fullName'
        })
        .populate({
            path: 'discipline',
            select: 'name'
        })
        .populate({
            path: 'cabinet',
            select: 'name'
        })
        .populate({
            path: 'event',
            populate: {
                path: 'timeId',
                select: 'name'
            }
        })
        .exec()
        .then(function (doc) {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send("Resource doesn't exist");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB internal error");
        });
}