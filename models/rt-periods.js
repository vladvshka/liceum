const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
  "name": {
    "type": String,
    "required": true
  },
  "startDate": {
    "type": Date,
    "required": true
  },
  "endDate": {
    "type": Date,
    "required": true
  },
  "color": {
    "type": String
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

const model = mongoose.model('rt-periods', schema);
module.exports = model;