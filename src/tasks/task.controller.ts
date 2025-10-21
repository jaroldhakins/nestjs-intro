import type { ITask } from './task.model';
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';

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

    @Post()
    public create (@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }
}
