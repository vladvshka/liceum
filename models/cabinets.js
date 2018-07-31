const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
  "name": {
    "type": String,
    "required": true
  },
  "capacity": {
    "type": Number,
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
const model = mongoose.model('cabinets', schema);
async function beforeSave() {
  this.updated = await Date.now();
}
module.exports = model;