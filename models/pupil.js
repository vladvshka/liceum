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
	created: {
		type: Date,
		default: Date.now
	},
	url: {
		type: String
	}
});

pupilSchema.methods.comparePasswords = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});
}

pupilSchema.pre('save', preSave);
const pupilModel = mongoose.model('Pupil', pupilSchema);

function preSave() {
	const pupil = this;
	const password = pupil.password;
	pupil.url = makeHash(pupil);

	bcrypt.hash(password, config.saltRounds, function (err, hash) {
		if (err) {
			console.error(err);
		} else {
			pupil.password = hash;
		}
	});
}

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