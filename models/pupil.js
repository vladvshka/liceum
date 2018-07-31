const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

pupilSchema.pre('save', function (next) {
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
});

pupilSchema.methods.comparePasswords = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			cb(err);
		} else {
			cb(null, isMatch);
		}
	});
}

const pupilModel = mongoose.model('Pupil', pupilSchema);

module.exports = pupilModel;

/*
function define(mongoose, fn) {
    const pupilSchema = new Schema({
		email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        status: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        confirmMailToken: String,
        examStatus: String
	});

    mongoose.model('Pupil', pupilSchema);
	fn();
}

exports.define = define;

*/