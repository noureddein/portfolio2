const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN
  }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (name, senderEmail, subject, message, callback) => {
  const mailOptions = {
    from: `${name} <${senderEmail}>`,
    to: 'noureddein@gmail.com',
    subject,
    text: message
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports = sendMail;

