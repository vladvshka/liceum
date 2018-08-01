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

adminUserSchema.statics.findAndUpdateById = function (id, update, res) {
	this.update({
			_id: id
		}, update)
		.then(function (doc) {
			res.sendStatus(200);
		})
		.catch(function (err) {
			console.error(err);
			res.status(500).send("DB updating error");
		});
}

const adminUserModel = mongoose.model('AdminUser', adminUserSchema);
module.exports = adminUserModel;