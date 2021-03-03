import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app/app.controller';
import { EmailService } from './services/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [EmailService],
})
export class AppModule {}
