import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailServiceInterface } from 'src/interfaces/email-service.interface';
import { EmailType } from 'src/types/email.type';
import { TaskType } from 'src/types/task.type';
import { MailgunService } from './mailgun.service';
import { SendgridService } from './sendgrid.service';
import { SesService } from './ses.service';

@Injectable()
export class EmailService {
  private _servicePreference: any[];
  private _logger: Logger = new Logger(EmailService.name);
  constructor(
    private sesService: SesService,
    private sendgridService: SendgridService,
    private mailgunService: MailgunService,
    private configService: ConfigService,
  ) {
    const order = this.configService.get('servicePreference').split(',');
    this._servicePreference = order.map(serviceName => this[`${serviceName}Service`]);
  }

  _recursiveTryServices(email: EmailType, services: EmailServiceInterface[]) {
    const currentService = services.shift();
    if (!!currentService) {
      console.log('trying service', currentService.constructor.name);
      return this._trySend(email, currentService).catch(e => {
        console.log('Caught exception, trying next service ->', e);
        return this._recursiveTryServices(email, services);
      });
    } else {
      return Promise.reject('All services are down. Panic.');
    }
  }
  _trySend(email: EmailType, service: EmailServiceInterface) {
    return service.send(email);
  }

  sendEmail(email: EmailType): Promise<TaskType> {
    const task = new TaskType();
    return this._recursiveTryServices(email, this._servicePreference).then((ret) => {
      return {status: 0, result: ret}
    }).catch((e) => {
      console.log('Main catch', e);

      return {status: 1, error: e};
    });
  }
}
