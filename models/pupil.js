const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require("path");
const config = require('../config');
const makeHash = require('object-hash');
const Schema = mongoose.Schema;

const pupilSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: "virgin"
	},
	confirmationUrl: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	fullName: {
		type: String
	},
	schedule: [{
		type: Schema.Types.ObjectId,
		ref: 'pupilScheduleModel'
	}]
});

pupilSchema.pre('save', cryptPassword);
pupilSchema.post('update', cryptPassword);

function cryptPassword(next) {
	const pupil = this;
	const password = pupil.password;
	pupil.confirmationUrl = makeHash({
		password: pupil.password,
		email: pupil.email
	});

	bcrypt.hash(password, config.saltRounds, function (err, hash) {
		if (err) {
			console.error(err);
		} else {
			pupil.password = hash;

			next();
		}
	});
}

pupilSchema.statics.setNewPassword = function(email, update, res) {
	this.update({
			email: email
		},
		update
	)
	.then(function (doc) {
		if (doc) {
			res.status(200).json(email);
		} else {
			res.status(404).send("User not found in Db");
		}
	})
	.catch(function (err) {
		console.error(err);
		res.status(500).send("DB finding pupil error");
	});
}

//methods defined on schema are called from model
pupilSchema.statics.comparePasswords = function (pupil, res) {
	this.findOne({
		email: pupil.email
	})
	.then(function (doc) {
		if (doc) {
			bcrypt.compare(pupil.password, doc.password)
				.then(function(isMatch){
					if (isMatch) {
						res.sendFile(path.join(__dirname, '../public/cabinet/index.html'));
					} else {
						res.sendStatus(401);
					}
				})
				.catch(function (err) {
					console.error(err);
					res.status(500).send("DB checking pupil error");
				});
		} else {
			res.status(404).send("Pupil not found in Db");
		}
	})
	.catch(function (err) {
		console.error(err);
		res.status(500).send("DB checking pupil error");
	});	
}

const pupilModel = mongoose.model('Pupil', pupilSchema);
module.exports = pupilModel;