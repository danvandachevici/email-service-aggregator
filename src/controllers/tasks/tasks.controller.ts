import { Controller, Get, Param } from "@nestjs/common";
import { IdType } from "src/types/id.type";
import { TaskType } from "src/types/task.type";
@Controller('tasks')
export class TasksController {
  constructor() {}

  @Get(':taskId')
  getTask(@Param('taskId') taskId: IdType): Promise<TaskType> {
    return Promise.resolve(new TaskType());
  }
}