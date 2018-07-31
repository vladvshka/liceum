const mongoose = require('mongoose');
//const cabinetModel = require('./cabinets');
const cabinetModel = 'link';
const Schema = mongoose.Schema;

const rtEventSchema = new Schema({
    timeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'times'
    },
    disciplines: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'disciplines'
    }],
    cabinets: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cabinets'
    }],
    capacity: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "new"
    }
});

rtEventSchema.pre('save', beforeSave);

function beforeSave(next) {
    //sum capacity
    const self = this;
    let sum = 0;

    self.cabinets.forEach(cabinetId => {
        cabinetModel
            .findById({
                _id: cabinetId
            })
            .then(function (cabinet) {
                if (cabinet) {
                    sum += cabinet.capacity;
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    });

    self.capacity = sum;
    next();
}

const rtEventModel = mongoose.model('rt-event', rtEventSchema);

module.exports = rtEventModel;