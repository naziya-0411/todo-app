import { otpModel } from '../models/otpDB';




export default class otpController {
  sendOTP = async () => {
    try {
      let transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        }
        });

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
}

  resendOTP = () => {

  };

}



