import { Controller, Post } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
import { TaskType } from 'src/types/task.type';

@Controller('email-service')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Post('send')
  sendEmail(): Promise<TaskType> {

  }
}
