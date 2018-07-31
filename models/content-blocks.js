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
  "visible": {
    "type": Boolean,
    "required": true
  },
  "order": {
    "type": Number
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
const model = mongoose.model('content-blocks', schema);
async function beforeSave() {
  this.updated = await Date.now();
}
module.exports = model;