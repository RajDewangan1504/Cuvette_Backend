// const twilio = require('twilio');
const config = require('../config');

// const client = new twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

// Send SMS
exports.sendSms = async (to, message) => {
    await client.messages.create({
        body: message,
        from: config.TWILIO_PHONE_NUMBER,
        to
    });
};
