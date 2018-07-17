const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
	login: String,
	password: String
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;