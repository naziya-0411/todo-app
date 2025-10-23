import nodemailer from 'nodemailer';
import env from '../../constants.js';

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) console.log('Transporter verification failed:', error);
      else console.log('Transporter is ready');
    });

    let info = await transporter.sendMail({
      from: `"Naziya Begum" <${env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.log('Error sending email:', error.message);
  }
};

export { mailSender };
