import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskLabel } from './task-label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskLabel])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TasksModule {}
