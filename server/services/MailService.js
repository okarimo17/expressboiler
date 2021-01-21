const nodemailer = require("nodemailer");
const InformationService = require("./InformationService");
const {
  MailSchemas: { HomeSchema, ContactSchema, ServiceSchema },
} = require("../validaters");

let { smtpserver, smtpport, smtpaccount, stmppass } = process.env;

const transporter = nodemailer.createTransport({
  host: smtpserver,
  port: smtpport,
  secure: true,
  auth: {
    user: smtpaccount, // this should be YOUR GMAIL account
    pass: stmppass, // this should be your password
  },
});

function MailService() {
  async function sendHomeMail(mailData) {
    await HomeSchema.validateAsync(mailData).catch((err) => {
      throw new BadRequest(err.message);
    });
    var textBody = `FROM: ${mailData.name} EMAIL: ${mailData.email} MESSAGE: ${mailData.message}`;
    var htmlBody = `<h2>Home Contact Form</h2>
                    <p>from: ${mailData.name} <a href="mailto:${mailData.email}">${mailData.email}</a> , <a href="tel:${mailData.phone}">${mailData.phone}</a>  </p>
                    <p>Destination From: ${mailData.from}</p>
                    <p>Destination To: ${mailData.to}</p>
                    <p>${mailData.message}</p>`;
    return sendMailHandler(mailData, textBody, htmlBody, "Home");
  }

  async function sendContactMail(mailData) {
    await ContactSchema.validateAsync(mailData).catch((err) => {
      throw new BadRequest(err.message);
    });
    var textBody = `FROM: ${mailData.name} , Enterprise: ${mailData.entreprise} EMAIL: ${mailData.email} MESSAGE: ${mailData.message}`;
    var htmlBody = `<h2>Contact Page Form</h2>
                    <p>from: ${mailData.name} <a href="mailto:${mailData.email}">${mailData.email}</a> , <a href="tel:${mailData.phone}">${mailData.phone}</a>  </p>
                    <p>Enterprise : ${mailData.entreprise} </p>
                    <p>${mailData.message}</p>`;
    return sendMailHandler(mailData, textBody, htmlBody, "Contact Page");
  }

  async function sendServiceContactMail(mailData) {
    await ServiceSchema.validateAsync(mailData).catch((err) => {
      throw new BadRequest(err.message);
    });
    var textBody = `FROM: ${mailData.name} EMAIL: ${mailData.email} MESSAGE: ${mailData.message}`;
    var htmlBody = `<h2>Contact Page Form</h2>
                    <p>from: ${mailData.name} <a href="mailto:${mailData.email}">${mailData.email}</a> , <a href="tel:${mailData.phone}">${mailData.phone}</a>  </p>
                    <p>${mailData.message}</p>`;
    return sendMailHandler(mailData, textBody, htmlBody, "Service Page");
  }

  async function sendMailHandler(mailData, textBody, htmlBody, formSource) {
    let {
      email: toEmail,
      sitename,
    } = await InformationService.getInformation();
    console.log(sitename);
    var mail = {
      from: mailData.email,
      to: toEmail,
      subject: `${sitename} ${formSource} Contact Form Result.`,
      text: textBody,
      html: htmlBody,
    };

    return new Promise((resolve) => {
      transporter.sendMail(mail, function (err, info) {
        if (err) {
          console.log(err);
          resolve({
            message: "Votre e-mail n'a pas été envoyé.",
            success: false,
          });
        } else {
          resolve({
            message: `Votre e-mail a bien été envoyé : ${info.messageId}`,
            success: true,
          });
        }
      });
    });
  }

  return {
    sendHomeMail,
    sendContactMail,
    sendServiceContactMail,
  };
}

module.exports = MailService();
