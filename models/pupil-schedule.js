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

pupilScheduleSchema.statics.findAll = function (req, res, next) {
    this.find({})
        .populate({
            path: 'pupilId',
            select: 'fullName'
        })
        .populate({
            path: 'discipline',
            select: 'name'
        })
        .populate({
            path: 'cabinet',
            select: 'name'
        })
        .populate({
            path: 'event',
            populate: {
                path: 'timeId',
                select: 'name'
            }
        })
        .exec()
        .then(function (doc) {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).send("Resource doesn't exist");
            }
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).send("DB internal error");
        });
}

const pupilScheduleModel = mongoose.model('pupil-schedule', pupilScheduleSchema);
module.exports = pupilScheduleModel;