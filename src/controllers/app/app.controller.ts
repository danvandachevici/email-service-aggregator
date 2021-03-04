import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SendEmailDto } from '../../dtos/send-email.dto';
import { EmailService } from '../../services/email.service';
import { EmailType } from '../../types/email.type';
import { ResponseType } from '../../types/response.type';

@Controller('email-service')
export class AppController {
  constructor(
    private readonly emailService: EmailService
  ) {}

  @Post('send')
  sendEmail(@Body() params: SendEmailDto): Promise<ResponseType> {
    const email = new EmailType(plainToClass(SendEmailDto, params));
    return this.emailService.sendEmail(email);
  }
}
