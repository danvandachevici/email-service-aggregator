import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EmailService } from '../../services/email.service';
import { SendEmailDto} from '../../dtos/send-email.dto';
import { SesService } from '../../services/ses.service';
import { SendgridService } from '../../services/sendgrid.service';
import { MailgunService } from '../../services/mailgun.service';
import { ConfigModule } from '@nestjs/config';

describe('AppController', () => {
  let app: TestingModule;
  let sesService: SesService;
  let sendgridService: SendgridService;
  let mailgunService: MailgunService;
  let mockParams: SendEmailDto;
  let appController;

  const assessSuccess = function (expectedServiceName) {
    return (ret) => {
      expect(ret.status).toBe(0);
      expect(ret.lastService).toBe(expectedServiceName);
    }
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development'],
        }),
      ],
      controllers: [AppController],
      providers: [EmailService, SesService, SendgridService, MailgunService],
    }).compile();

    sesService = app.get<SesService>(SesService);
    sendgridService = app.get<SendgridService>(SendgridService);
    mailgunService = app.get<MailgunService>(MailgunService);

    mockParams = {
      to: ['dan.vandachevici@gmail.com'],
      subject: 'test subject',
      body: 'test body',
    };

    appController = app.get<AppController>(AppController);
  });

  describe('sendEmail', () => {
    it('Sends email & returns status 0, with the first service', () => {     
      expect.assertions(2);
      jest.spyOn(sesService, 'send').mockImplementation(() => Promise.resolve({result: true}));
      return appController.sendEmail(mockParams).then(assessSuccess(sesService.constructor.name));
    });
    it('Sends email & returns status 0, with the second service', () => {     
      expect.assertions(2);
      jest.spyOn(sesService, 'send').mockImplementation(() => Promise.reject({error: 'batman'}));
      jest.spyOn(sendgridService, 'send').mockImplementation(() => Promise.resolve({result: true}));
      return appController.sendEmail(mockParams).then(assessSuccess(sendgridService.constructor.name));
    });
    it('Sends email & returns status 0, with the third service', () => {     
      expect.assertions(2);
      jest.spyOn(sesService, 'send').mockImplementation(() => Promise.reject({error: 'batman'}));
      jest.spyOn(sendgridService, 'send').mockImplementation(() => Promise.reject({error: 'batman'}));
      jest.spyOn(mailgunService, 'send').mockImplementation(() => Promise.resolve({result: true}));
      return appController.sendEmail(mockParams).then(assessSuccess(mailgunService.constructor.name));
    });
  });
});
