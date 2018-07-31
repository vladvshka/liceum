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
/* schema.pre('update', beforeUpdate); */

const model = mongoose.model('times', schema);

function beforeSave() {
  console.log('***before save fired***');
  /* console.log(this.startTime.getTime());
  console.log(this.endTime.getTime()); */
  this.updated = Date.now();
}
/* 
function beforeUpdate(next) {
  console.log('***before update fired***');
  console.log(this.startTime.getTime());
  console.log(this.endTime.getTime());
  this.updated = Date.now();
  next();
} */

module.exports = model;