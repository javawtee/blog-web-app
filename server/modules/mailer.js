var nodemailer = require('nodemailer');

var user = 'forMailerPurpose@gmail.com'

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass: '12345678Ab'
  }
});

module.exports = (to, subject, content) => {
    return new Promise((resolve, reject) => {
        // transporter.sendMail(from, to, subject, plainText, html)
        transporter.sendMail({from: user, to, subject, html:content}, function(error, info){
            if (error) {
                reject(error)
            } else {
                resolve(console.log('Email sent: ' + info.response));
            }
        })
    })
}