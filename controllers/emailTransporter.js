const nodemailer = require("nodemailer");
const config = require("../config");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(config.createTransportOptions);

module.exports = transporter;