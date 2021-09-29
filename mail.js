const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    api_key: '09973fbe3b401b4bee9e1ca9551819fc-45f7aa85-77be0187',
    domain: 'sandboxf117e5315a7b495b98993d60c6d26e42.mailgun.org'
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

