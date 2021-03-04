import { Injectable, Logger } from "@nestjs/common";
import { EmailServiceInterface } from "src/interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";
import * as sendgrid from '@sendgrid/mail';

@Injectable()
export class SendgridService implements EmailServiceInterface {
  private _logger: Logger = new Logger(SendgridService.name);
  constructor() {
    if (!!process.env.SENDGRID_API_KEY) {
      sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    }
  }

  send(email: EmailType): Promise<any> {
    if (!process.env.SENDGRID_API_KEY) {
      return Promise.reject('Sendgrid disabled');
    }
    const body = email.body + `<footer>Sent through sendgrid</footer>`;
    let params: any = {
      to: email.to,
      from: process.env.FROM_EMAIL,
      subject: email.subject,
    };
    if (email.contentType === 'html') {
      params.html = body;
    } else {
      /**
       * So.. sendgrid complains about having "empty content" if I leave
       * one of the two properties out. 
       * My expectation was that I either have a text mail or an HTML mail.
       * I guess I was wrong.
       */
      params.html = body;
    }
    this._logger.log(`Sending mail ${JSON.stringify(params)}`);
    return sendgrid.send(params).catch((e) => {
      console.log('Exception:', JSON.stringify(e, null, 2));
      this._logger.error(`Cannot send because ${JSON.stringify(e, null, 2)}`);
      throw e;
    });
  }
}