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
            res.status(200).send(docs);
        })
        .catch(function (err) {
            console.error(err);
            res.send('DB receiving entries error');
        });
}

function getContentBlock(req, res, next) {
    const blockId = req.params.id.toString();

    contentBlockModel.findById(blockId)
        .then(function (doc) {
            res.status(200).send(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.send('DB receiving entry by id error');
        });
}

function postContentBlock(req, res, next) {
    const contentBlock = req.body;
    console.log(contentBlock);
    
    const newContentBlock = new contentBlockModel(contentBlock);

    newContentBlock.save()
        .then(function (doc) {
            console.log("Saved object: ", doc);
            res.status(200).send(newContentBlock);
        })
        .catch(function (err) {
            console.error(err);
            res.send('DB saving error');
        });
}

function editContentBlock(req, res, next) {
    const blockId = req.params.id.toString();
    const update = req.body;

    update.updated = Date.now();

    contentBlockModel.findOneAndUpdate(blockId, update, {
            new: true
        })
        .then(function (doc) {
            res.status(200).send(`Updated object: ${doc}`);
        })
        .catch(function (err) {
            console.error(err);
            res.send('DB updating error');
        });
}

function deleteContentBlock(req, res, next) {
    const blockId = req.params.id.toString();

    contentBlockModel.findOneAndRemove(blockId)
        .then(function (offer) {
            res.status(200).send(`Deleted object: ${offer}`);
        })
        .catch(function (err) {
            console.error(err);
            res.send('DB deleting error');
        });
}

module.exports = contentBlocksRouter;