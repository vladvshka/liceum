const express = require('express');
const contentBlocksRouter = express.Router();

const contentBlockModel = require('../../models/contentBlock');
const openConnection = require('../../controllers/dbConnection');

contentBlocksRouter.get('/content-blocks', getContentBlocks);
contentBlocksRouter.get('/content-blocks/:id', getContentBlock);
contentBlocksRouter.post('/content-blocks', postContentBlock);
contentBlocksRouter.put('/content-blocks/:id', editContentBlock);
contentBlocksRouter.delete('/content-blocks/:id', deleteContentBlock);

const connection = openConnection();

function getContentBlocks(req, res, next) {
    contentBlockModel.find({})
        .then(function (docs) {
            res.status(200).json(docs);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entries error');
        });
}

function getContentBlock(req, res, next) {
    const blockId = req.params.id;
    //console.log(blockId);   

    contentBlockModel.findById({ _id: blockId })
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entry by id error');
        });
}

function postContentBlock(req, res, next) {
    const contentBlock = req.body;
    const newContentBlock = new contentBlockModel(contentBlock);

    newContentBlock.save()
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB saving error');
        });
}

function editContentBlock(req, res, next) {
    const blockId = req.params.id;
    //console.log(blockId);
    const update = req.body;
    const options = {
        new: true
    };

    update.updated = Date.now();

    contentBlockModel.findOneAndUpdate({ _id: blockId }, update, options)
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB updating error');
        });
}

function deleteContentBlock(req, res, next) {
    const blockId = req.params.id;
    //console.log(blockId);

    contentBlockModel.findOneAndRemove({ _id: blockId })
        .then(function (offer) {
            console.log(offer);
            res.status(200).json(offer);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB deleting error');
        });
}

module.exports = contentBlocksRouter;