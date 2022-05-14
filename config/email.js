const nodemailer = require("nodemailer");

const sendEmail = async (emailRecipient, subject, htmlToSend) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: emailRecipient,
      subject: subject,
      //text: text,
      html: htmlToSend,
    });
    console.log("Mail verificaton link has been sent to your mail.");
    /*
    res
      .status(200)
      .json({ message: `Mail verificaton link has been sent to your mail.` });*/
  } catch (err) {
    console.log(err);
    /*
    res.status(500).json({ message: `Error occured while sending an email.` });
    */
  }
};
module.exports = sendEmail;
