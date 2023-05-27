const nodemailer = require('nodemailer')

const sendMail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: 'voduchuy2001@gmail.com',
        to: email,
        subject: subject,
        html: message,
    });

    return info
}

module.exports = sendMail