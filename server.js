var emailHelper = require('./public/js/email.js');
const nodemailer = require('nodemailer');

app.post('/preview', function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mechashark@gmail.com',
      pass: 'busa1234'
    }
  })
  const mailOptions = {
    from: `${req.body.email}`,
    to: 'test-email@gmail.com',
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
    replyTo: `${req.body.email}`
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })
})