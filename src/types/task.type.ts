import { IdType } from "./id.type";
import { TaskStatusEnum } from "./task-status.enum";

export class TaskType {
  id: IdType;
  created: Date;
  status: TaskStatusEnum;
  lastStatusChange: Date;
  finished: Date;
}