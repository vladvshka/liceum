const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pupilSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	hashedPassword: {
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

const pupilModel = mongoose.model('Pupil', pupilSchema);

module.exports = pupilModel;

/*
function define(mongoose, fn) {
    const pupilSchema = new Schema({
		email: {
            type: String,
            required: true
        },
        hashedPassword: {
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