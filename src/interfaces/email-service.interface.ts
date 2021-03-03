import { EmailType } from "src/types/email.type";
import { TaskType } from "src/types/task.type";

export interface EmailServiceInterface {
  send(email: EmailType): Promise<TaskType>;
}