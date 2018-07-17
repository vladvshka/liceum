const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function define(mongoose, fn) {
    const settingsSchema = new Schema({
        googleAnalyticsToken: String
    });

    mongoose.model('Setting', settingsSchema);
	fn();
}

exports.define = define;