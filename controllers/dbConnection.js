const mongoose = require('mongoose');

function openConnection() {
    mongoose.connect('mongodb://localhost:27017/lyceumDb', {
            useNewUrlParser: true
        })
        .then(onResolved)
        .catch(onRejected);

    return mongoose.connection;
}

function onResolved() {
    console.log('Connected to DB');
}

function onRejected(err) {
    console.log('DB connection error: ', err);
}

module.exports = openConnection;