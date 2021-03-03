import { Injectable } from "@nestjs/common";
import { EmailServiceInterface } from "src/interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";
import { TaskType } from "src/types/task.type";

@Injectable()
export class SesService implements EmailServiceInterface {
  send(email: EmailType): Promise<TaskType> {
    return new Promise((resolve, reject) => {
      reject('Can\'t execute send on ses');
    })
  }

}