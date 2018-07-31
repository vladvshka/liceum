const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
  "name": {
    "type": String
  },
  "startTime": {
    "type": Date,
    "required": true
  },
  "endTime": {
    "type": Date,
    "required": true
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
const model = mongoose.model('times', schema);
async function beforeSave() {
  console.log('***before save fired***');
  console.log(this);
  this.updated = await Date.now();
}
module.exports = model;