const express = require('express');
const adminUserRouter = express.Router();

const adminUserModel = require('../../models/adminUser');

adminUserRouter.get('/admin-user', getAdminUsers);
adminUserRouter.get('/admin-user/:id', getAdminUser);
adminUserRouter.post('/admin-user', postAdminUser);
adminUserRouter.put('/admin-user/:id', editAdminUser);
adminUserRouter.delete('/admin-user/:id', deleteAdminUser);

function getAdminUsers(req, res, next) {
    adminUserModel.find({})
        .then(function (docs) {
            res.status(200).json(docs);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entries error');
        });
}

function getAdminUser(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);   

    adminUserModel.findById({ _id: id })
        .then(function (doc) {
            res.status(200).json(doc);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB receiving entry by id error');
        });
}

function postAdminUser(req, res, next) {
    const adminUser = req.body;
    const newAdminUser = new adminUserModel(adminUser);

    newAdminUser.save()
        .then(function (doc) {
            res.status(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB saving error');
        });
}

function editAdminUser(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);
    const update = req.body;
    const options = {
        new: true
    };

    adminUserModel.findOneAndUpdate({ _id: id }, update, options)
        .then(function (doc) {
            res.status(200);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send('DB updating error');
        });
}

function deleteAdminUser(req, res, next) {
    const id = req.params.id;
    //console.log(blockId);

    adminUserModel.findOneAndRemove({ _id: id })
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

module.exports = adminUserRouter;