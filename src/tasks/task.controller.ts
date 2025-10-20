import type { ITask } from './task.model';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor (
        private readonly taskService: TaskService
    ) {}

    @Get()
    public findAll(): ITask[] {
        return this.taskService.findAll();
    }

    @Get('/:id')
    public findOne(@Param('id') id: string): ITask {
        const task = this.taskService.findOne(id);

        if (task) {
            return task
        }

        throw new NotFoundException();
    }
}
