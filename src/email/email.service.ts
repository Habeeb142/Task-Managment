import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com', // replace with your SMTP server
        //   port: 587, // replace with your SMTP port
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.NODE_MAILER_MAIL,
            pass: process.env.NODE_MAILER_PASS
          },
        //   logger: true, // Enable debug mode
        //   debug: true, // Show debug output
        });
      }
      
      async sendMail(to: string, subject: string, html: string) {
        const mailOptions: nodemailer.SendMailOptions = {
          from: 'no-reply', 
          to,
          subject,
          html,
        };
    
        try {
            await this.transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            return false
        }
    }
}
