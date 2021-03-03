import { IdType } from "./id.type";
import { TaskStatusEnum } from "./task-status.enum";
import * as nanoid from 'nanoid';

const keyWidth = 5;

export class TaskType {
  id: IdType;
  created: Date;
  status: TaskStatusEnum;
  lastStatusChange: Date;
  finished: Date;

  constructor() {
    this.id = nanoid.nanoid(keyWidth);
    this.created = new Date();
    this.status = TaskStatusEnum.started;
    this.lastStatusChange = new Date();
    this.finished = null;
  }
}