const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    googleAnalyticsToken: String
});

const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;