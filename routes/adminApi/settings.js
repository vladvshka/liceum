const express = require('express');
const settingsRouter = express.Router();

const settingsModel = require('../../models/settings');

settingsRouter.get('/settings', getAllSettings);
settingsRouter.get('/settings/:id', getUserSettings);
settingsRouter.post('/settings', postSettings);
settingsRouter.put('/settings/:id', editSettings);
settingsRouter.delete('/settings/:id', deleteSettings);

function getAllSettings(req, res, next) {
    settingsModel.find({})
        .then(function (docs) {
            res.status(200).json(docs);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entries error');
        });
}

function getUserSettings(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);   

    settingsModel.findById({ _id: id })
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entry by id error');
        });
}

function postSettings(req, res, next) {
    const settings = req.body;
    const newSettings = new settingsModel(settings);

    newSettings.save()
        .then(function (doc) {
            res.status(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB saving error');
        });
}

function editSettings(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);
    const update = req.body;
    const options = {
        new: true
    };

    settingsModel.findOneAndUpdate({ _id: id }, update, options)
        .then(function (doc) {
            res.status(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB updating error');
        });
}

function deleteSettings(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);

    settingsModel.findOneAndRemove({ _id: id })
        .then(function (offer) {
            //console.log(offer);
            if (offer) {
                res.status(204);
            } else {
                res.status(404).send("Resource doesn't exist");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB deleting error');
        });
}

module.exports = settingsRouter;