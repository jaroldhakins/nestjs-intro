import { Body, Controller, Get, NotFoundException, Param, Post, Patch, HttpStatus, Delete, HttpCode, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusExcepetion } from './exceptions/wrong-task-status.exception';
import { Task } from './task.entity';
import { CreateTaskLabelDto } from './create-task-label.dto';

@Controller('tasks')
export class TaskController {
    constructor (
        private readonly taskService: TaskService
    ) {}

    @Get()
    public async findAll(): Promise<Task[]> {
        return await this.taskService.findAll();
    }

    @Get('/:id')
    public async findOne(@Param() params: FindOneParams): Promise<Task> {
        return await this.findOneOrFail(params.id);
    }

    @Post()
    public async create (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    public async UpdateTask(
        @Param() params: FindOneParams,
        @Body() updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
        const task = await this.findOneOrFail(params.id);
        try {
            return await this.taskService.updateTask(task, updateTaskDto);
        } catch (error) {
            if (error instanceof WrongTaskStatusExcepetion) {
                throw new BadRequestException([error.message]);
            }
            throw error;
        }
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteTask(@Param() params: FindOneParams): Promise<void> {
        const task = await this.findOneOrFail(params.id);
        await this.taskService.deleteTask(task);
    }

    @Post(':id/labels')
    async addLabels(
        @Param() { id }: FindOneParams,
        @Body() labels: CreateTaskLabelDto[],
    ): Promise<Task> {
    const task = await this.findOneOrFail(id);
    return await this.taskService.addLabels(task, labels);
  }

    private async findOneOrFail(id: string): Promise<Task> {
        const task = await this.taskService.findOne(id);

        if (!task) {
            throw new NotFoundException();
        }

        return task;
    }
}
