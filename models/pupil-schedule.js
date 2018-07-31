const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pupilScheduleSchema = new Schema({
    pupilId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'pupilModel'
    },
    discipline: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'disciplines'
    },
    cabinet: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cabinets'
    },
    event: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'rtEventModel'
    }
});

const pupilScheduleModel = mongoose.model('pupil-schedule', pupilScheduleSchema);

module.exports = pupilScheduleModel;