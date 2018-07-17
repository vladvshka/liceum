const express = require('express');
const contentBlocksRouter = express.Router();
const mongoose = require('mongoose');
const contentBlockModel = require('../../models/contentBlock');

mongoose.connect('mongodb://localhost:27017/lyceumDb', {
        useNewUrlParser: true
    })
    .then(onResolved)
    .catch(onRejected);


contentBlocksRouter.get('/content-blocks', getContentBlocks);
contentBlocksRouter.get('/content-blocks/:id', getContentBlock);
contentBlocksRouter.post('/content-blocks', postContentBlock);
contentBlocksRouter.put('/content-blocks/:id', editContentBlock);


function onResolved() {
    console.log('Connectd to DB');
}

function onRejected(err) {
    console.log('DB connection error: ', err);
}

function getContentBlocks(req, res, next) {
    //get all contents fromn db

    res.send('JSON');
}

function getContentBlock(req, res, next) {
    //get all contents fromn db

    res.send('JSON');
}

function postContentBlock(req, res, next) {
    const contentBlock = req.body.contentBlock;
    const newContentBlock = new contentBlockModel(contentBlock);

    newContentBlock.save()
        .then(function (doc) {
            console.log("Saved object: ", doc);
            mongoose.disconnect(); // отключение от базы данных
            res.send(newContentBlock);
        })
        .catch(function (err) {
            console.error(err);
            mongoose.disconnect();
            res.send('DB saving error');
        });

    
}

function editContentBlock(req, res, next) {
    //get all contents fromn db

    res.send('JSON');
}

module.exports = contentBlocksRouter;