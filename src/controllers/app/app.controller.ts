import { Body, Controller, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SendEmailDto } from 'src/dtos/send-email.dto';
import { EmailService } from 'src/services/email.service';
import { EmailType } from 'src/types/email.type';
import { TaskType } from 'src/types/task.type';

@Controller('email-service')
export class AppController {
  constructor(
    private readonly emailService: EmailService
  ) {}

  @Post('send')
  sendEmail(@Body() params: SendEmailDto): Promise<TaskType> {
    const email = new EmailType(plainToClass(SendEmailDto, params));
    return this.emailService.sendEmail(email);
  }
}
