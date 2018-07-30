const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
  "body": {
    "type": String,
    "required": true
  },
  "header": {
    "type": String,
    "required": true
  },
  "menuHeader": {
    "type": String,
    "required": true
  },
  "updated": {
    "type": Date
  },
  "created": {
    "type": Date,
    "default": Date.now
  },
  "visible": {
    "type": Boolean,
    "required": true
  },
  "order": {
    "type": Number
  }
});
schema.pre('save', beforeSave);
const model = mongoose.model('cb', schema);
async function beforeSave() {
  this.updated = await Date.now();
}
module.exports = model;