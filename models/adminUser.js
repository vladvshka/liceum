const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
	login: {
		type: String,
		required: true
	},
	salt: String,
	hash: String,
	created: {
		type: Date,
		default: Date.now
	}
});

const adminUserModel = mongoose.model('AdminUser', adminUserSchema);

module.exports = adminUserModel;

/*
function define(mongoose, fn) {
    const adminUserSchema = new Schema({
		login: {
			type: String,
			required: true
		},
		salt: String,
		hash: String,
		created: {
			type: Date,
			default: Date.now
		}
	});

    mongoose.model('AdminUser', adminUserSchema);
	fn();
}

exports.define = define;
*/