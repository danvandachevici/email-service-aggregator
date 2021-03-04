import { EmailServiceInterface } from "src/interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";
import { TaskType } from "src/types/task.type";
import { EmailService } from "./email.service";
import * as mailgun from 'mailgun-js';

export class MailgunService implements EmailServiceInterface {
  mgInstance;
  constructor() {
    this.mgInstance = mailgun({
      apiKey: process.env.MAILGUN_API_KEY, 
      domain: process.env.MAILGUN_DOMAIN
    })
  }
  send(email: EmailType): Promise<any> {
    return new Promise((resolve, reject) => {
      const data = {
        // from: "Mailgun Sandbox <postmaster@sandboxeacf76066ea04bafb45a4ff86d5df302.mailgun.org>",
        from: email.from,
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