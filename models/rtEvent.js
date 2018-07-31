const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rtEventSchema = new Schema({

});

const rtEventModel = mongoose.model('Setting', rtEventSchema);

module.exports = rtEventModel;