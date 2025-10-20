import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';

@Injectable()
export class TaskService {
    private tasks: ITask[] = [];

    findAll(): ITask[] {
        return this.tasks;
    }

    findOne(id: string): ITask | undefined {
        return this.tasks.find((task) => task.id == id);
    }
}
