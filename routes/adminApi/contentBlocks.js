const express = require('express');
const contentBlocksRouter = express.Router();

const contentBlockModel = require('../../models/contentBlock');

contentBlocksRouter.get('/content-blocks', getContentBlocks);
contentBlocksRouter.get('/content-blocks/:id', getContentBlock);
contentBlocksRouter.post('/content-blocks', postContentBlock);
contentBlocksRouter.put('/content-blocks/:id', editContentBlock);
contentBlocksRouter.delete('/content-blocks/:id', deleteContentBlock);

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
    const id = req.params.id;
    //console.log(id);   

    contentBlockModel.findById({ _id: id })
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
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB saving error');
        });
}

function editContentBlock(req, res, next) {
    const id = req.params.id;
    //console.log(id);
    const update = req.body;
    const options = {
        new: true
    };

    update.updated = Date.now();

    contentBlockModel.findOneAndUpdate({ _id: id }, update, options)
        .then(function (doc) {
            res.sendStatus(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB updating error');
        });
}

function deleteContentBlock(req, res, next) {
    const id = req.params.id;
    //console.log(id);

    contentBlockModel.findOneAndRemove({ _id: id })
        .then(function (offer) {
            //console.log(offer);
            if (offer) {
                res.sendStatus(204);
            } else {
                res.status(404).send("Resource doesn't exist");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB deleting error');
        });
}

module.exports = contentBlocksRouter;