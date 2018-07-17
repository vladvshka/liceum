const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function define(mongoose, fn) {
    const pupilSchema = new Schema({
		firstName: String,
		lastName: String,
		parentName: String,
		birthDate: Date
	});

    mongoose.model('Pupil', pupilSchema);
	fn();
}

exports.define = define;