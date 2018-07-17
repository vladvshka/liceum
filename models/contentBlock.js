const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentBlockSchema = new Schema({
	text: String
});

const contentBlock = mongoose.model('contentBlock', contentBlockSchema);

module.exports = contentBlock;