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
    "type": Date
  },
  "created": {
    "type": Date,
    "default": Date.now
  }
});
schema.pre('save', beforeSave);
const model = mongoose.model('disciplines', schema);
async function beforeSave() {
  this.updated = await Date.now();
}
module.exports = model;