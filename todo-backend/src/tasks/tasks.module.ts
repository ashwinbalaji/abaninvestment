// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Import Task entity
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
