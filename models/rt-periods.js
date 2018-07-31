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
    "type": Date
  },
  "created": {
    "type": Date,
    "default": Date.now
  }
});
schema.pre('save', beforeSave);
const model = mongoose.model('rt-periods', schema);
async function beforeSave() {
  this.updated = await Date.now();
}
module.exports = model;