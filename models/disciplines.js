const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
	"name": {
		"type": String,
		"required": true
	},
	"active": {
		"type": Boolean,
		"required": true
	},
	"code": {
		"type": Number,
		"required": true,
		"default": 2
	},
	"variantsCount": {
		"type": Number,
		"required": true,
		"default": 2
	},
	"updated": {
		"type": Date,
		"default": Date.now
	},
	"created": {
		"type": Date,
		"default": Date.now
	}
});

schema.pre('update', updateDate);

function updateDate() {
	console.log('updating');

	this.update({}, {
		$set: {
			updated: new Date()
		}
	});
}

schema.statics.findAndUpdateById = function (id, update, res) {
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

const model = mongoose.model('disciplines', schema);
module.exports = model;