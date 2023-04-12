const nodemailer = require('nodemailer');

const sendMail = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Error sending email');
  }
};

module.exports = {
  sendMail,
};