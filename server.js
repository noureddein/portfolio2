'use strict'
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const pg = require('pg')
const sendMail = require('./mail')
const db = new pg.Client(process.env.DATABASE_URL)
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const swal = require('sweetalert')
const http = require('http')

// ======= ENV =============
const PORT = process.env.PORT
const EMAIL = process.env.EMAIL
const PASS = process.env.PASS
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

// ======= Middleware =======
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('imgs'));


app.get('/', homePage);
app.post('/sendEmail', sendEmail)
app.get('/download-CV', download)

// app.post('/sendEmail', (req, res) => {
//   const { name, senderEmail, subject, message } = req.body
//   console.log('Data:', req.body)
//   sendMail(name, senderEmail, subject, message, function (err, data) {
//     if (err) {
//       console.log(err)
//       res.json({ message: false })
//     } else {
//       res.json({ message: true })
//     }
//   })

// })

//! ===== Loading Home Page ===========

function homePage(req, res) {
  res.render('index')
}

//! ===== Send Email ===========

const OAuth2_client = new OAuth2(CLIENT_ID, CLIENT_SECRET)
OAuth2_client.setCredentials({ refresh_token: REFRESH_TOKEN })

function sendEmail(req, res) {
  const { name, senderEmail, subject, message } = req.body
  const sql = 'INSERT INTO sender (name, email, subject, message) VALUES($1,$2,$3,$4);';
  const safeValues = [name, senderEmail, subject, message]

  const accessToken = OAuth2_client.getAccessToken()
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken
    }
  })
  console.log('==============>>>', senderEmail)
  console.log('=============>>>>', accessToken)
  const mailOption = {
    from: `${req.body.name} <${req.body.senderEmail}>`,
    to: EMAIL,
    subject: subject,
    text: `
      Name of the sender: ${name}
      Email of the sender: ${senderEmail}
      ${message}
    `
  }



  db.query(sql, safeValues)
    .then(
      transporter.sendMail(mailOption, function (err, info) {
        if (err) {
          console.log('Error: ', err)
          res.json({ message: false })

        } else {
          console.log('Email Sent: ', info)
          res.json({ message: true })

        }
      })

    )
    .catch(error => console.log(error))
}

//! ===== Download the CV ===========

function download(req, res) {
  res.download(__dirname + '/files/CV-V2.0.docx', 'CV-V2.0.docx')
}



db.connect().then(() => {
  app.listen(PORT, () => console.log(`Listing to Port ${PORT}`));
  console.log('Connected to Database');
});