const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    showPupilCabinet: Boolean,
    showStats: Boolean,
    clientAppName: String,
    clientAppSecret: String,
    registrationEndDate: Date,
    confirmationEndDate: Date,
    rulesLink: String,
    rulesHTML: String,
    email1: String,
    email1Pass: String,
    email2: String,
    email2Pass: String,
    email3: String,
    email3Pass: String,
    email4: String,
    email4Pass: String,
    superPassword: String,
    reSiteKey: String,
    smsAPIKey: String,
    smsAPILogin: String,
    smsAPIName: String,
    smsAPISecretCode: String,
    showExamSeats1: Boolean,
    showExamSeats2: Boolean,
});

const settingsModel = mongoose.model('Setting', settingsSchema);

module.exports = settingsModel;

/*
function define(mongoose, fn) {
    const settingsSchema = new Schema({
        showPupilCabinet: Boolean,
        showStats: Boolean,
        clientAppName: String,
        clientAppSecret: String,
        registrationEndDate: Date,
        confirmationEndDate: Date,
        rulesLink: String,
        rulesHTML: String,
        email1: String,
        email1Pass: String,
        email2: String,
        email2Pass: String,
        email3: String,
        email3Pass: String,
        email4: String,
        email4Pass: String,
        superPassword: String,
        reSiteKey: String,
        smsAPIKey: String,
        smsAPILogin: String,
        smsAPIName: String,
        smsAPISecretCode: String,
        showExamSeats1: Boolean,
        showExamSeats2: Boolean,
    });

    mongoose.model(Setting, settingsSchema);
	fn();
}

exports.define = define;
*/