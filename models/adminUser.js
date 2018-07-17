const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function define(mongoose, fn) {
    const adminUserSchema = new Schema({
		login: String,
		password: String
	});

    mongoose.model('AdminUser', adminUserSchema);
	fn();
}

exports.define = define;