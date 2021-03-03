import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailServiceInterface } from 'src/interfaces/email-service.interface';
import { EmailType } from 'src/types/email.type';
import { TaskType } from 'src/types/task.type';
import { SendgridService } from './sendgrid.service';
import { SesService } from './ses.service';

@Injectable()
export class EmailService {
  private _servicePreference: any[];
  constructor(
    private sesService: SesService,
    private sendgridService: SendgridService,
    private configService: ConfigService,
  ) {
    const order = this.configService.get('servicePreference').split(',');
    this._servicePreference = order.map(serviceName => this[`${serviceName}Service`]);
  }

  _recursiveTryServices(email: EmailType, services: EmailServiceInterface[]) {
    const currentService = services.shift();
    console.log('trying service', currentService.constructor.name);
    if (currentService) {
      return this._trySend(email, currentService).catch(e => {
        return this._recursiveTryServices(email, services);
      });
    }
  }
  _trySend(email: EmailType, service: EmailServiceInterface) {
    return service.send(email);
  }

  sendEmail(email: EmailType): Promise<TaskType> {
    const task = new TaskType();
    return this._recursiveTryServices(email, this._servicePreference).then(() => {
      return task;
    }).catch((e) => {
      console.log('Main catch');
    });
  }
}
