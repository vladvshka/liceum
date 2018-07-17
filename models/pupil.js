const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pupilSchema = new Schema({
	firstName: String,
	lastName: String,
	parentName: String,
    birthDate: Date
});

const Pupil = mongoose.model('Pupil', pupilSchema);

module.exports = Pupil;

  