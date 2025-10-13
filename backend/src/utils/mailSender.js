// utils/mailSender.js
import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PASS, MAIL_USER } from '../../constants.js';

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      }
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'naziya@itobuz.com - Naziya Begum',
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email info: ", info);
    return info;

  } catch (error) {
    console.log(error.message);
  }
};

export { mailSender };