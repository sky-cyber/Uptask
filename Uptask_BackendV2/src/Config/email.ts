import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Looking to send emails in production? Check out our Email API/SMTP product!
const configMailer = () => {
   return {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
         user: process.env.SMTP_USER,
         pass: process.env.SMTP_PASS,
      },
   };
};

export const configMail = nodemailer.createTransport(configMailer());
