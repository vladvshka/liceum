const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentBlockSchema = new Schema({
	body: {
		type: String,
		required: true
	},
	header: {
		type: String,
		required: true
	},
	menuHeader: {
		type: String,
		required: true
	},
	updated: {
		type: Date,
	},
	created: {
		type: Date,
		default: Date.now
	},
	visible: {
		type: Boolean,
		required: true
	},
	order: Number
});

contentBlockSchema.pre('save', beforeSave);
const contentBlockModel = mongoose.model('contentBlock', contentBlockSchema);

async function beforeSave() {
	this.updated = await Date.now();
}

module.exports = contentBlockModel;

/*
function define(mongoose, fn) {
    const contentBlockSchema = new Schema({
		body: {
			type: String,
			required: true
		},
		header: {
			type: String,
			required: true
		},
		menuHeader: {
			type: String,
			required: true
		},
		updated: {
			type: Date,
		},
		created: {
			type: Date,
			default: Date.now
		},
		visible: {
			type: Boolean,
			required: true
		},
		order: Number
	});

	contentBlockSchema.pre('save', beforeSave);
    mongoose.model('contentBlock', contentBlockSchema);
	fn();
	
	async function beforeSave() {
		this.updated = await Date.now();
	}
}

exports.define = define;
*/