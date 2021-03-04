import { EmailServiceInterface } from "../interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";
import * as mailgun from 'mailgun-js';

export class MailgunService implements EmailServiceInterface {
  mgInstance;
  constructor() {
    if (!!process.env.MAILGUN_API_KEY && !!process.env.MAILGUN_DOMAIN) {
      this.mgInstance = mailgun({
        apiKey: process.env.MAILGUN_API_KEY, 
        domain: process.env.MAILGUN_DOMAIN
      })
    }
  }
  send(email: EmailType): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        return reject('Mailgun disabled');
      }
      const data = {
        // from: "Mailgun Sandbox <postmaster@sandboxeacf76066ea04bafb45a4ff86d5df302.mailgun.org>",
        from: 'dan.vandachevici@gmail.com',
        to: email.to,
        subject: email.subject,
        html: email.body + `<footer>Sent through mailgun</footer>`
      };
      this.mgInstance.messages().send(data, (error, body) => {
        if (!!error) {
          return reject(error);
        }
        resolve(body);
      })
    });
  }

}