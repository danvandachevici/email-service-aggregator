import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app/app.controller';
import { EmailService } from './services/email.service';
import { MailgunService } from './services/mailgun.service';
import { SendgridService } from './services/sendgrid.service';
import { SesService } from './services/ses.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [EmailService, SesService, MailgunService, SendgridService, Logger],
})
export class AppModule {}
