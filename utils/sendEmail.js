const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
function sendEmail(recipientEmail, subject, text, html) {
    const msg = {
        to: recipientEmail, // Change to your recipient
        from: process.env.SENDER_EMAIL, // Change to your verified sender
        subject,
        text,
        html,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent to ' + recipientEmail);
        })
        .catch((error) => {
            console.error(error)
        })
}

module.exports = sendEmail;