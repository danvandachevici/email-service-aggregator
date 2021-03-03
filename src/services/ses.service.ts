import { EmailServiceInterface } from "src/interfaces/email-service.interface";
import { EmailType } from "src/types/email.type";
import { TaskType } from "src/types/task.type";

export class SesService implements EmailServiceInterface {
  send(email: EmailType): Promise<TaskType> {
    throw new Error("Method not implemented.");
  }

}