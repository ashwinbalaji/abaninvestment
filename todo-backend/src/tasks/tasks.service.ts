// src/tasks/tasks.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto); // Create task instance
    return this.tasksRepository.save(task); // Save to database
  }

  // Retrieve all tasks
  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find(); // Retrieve all tasks
  }

  // Delete a task by ID
  async delete(id: number): Promise<void> {
    // Find task by ID
    const task = await this.tasksRepository.findOne({
      where: { id }, // Specify the condition using 'where'
    });

    if (task) {
      await this.tasksRepository.remove(task); // Remove task from database
    } else {
      throw new Error('Task not found'); // You can handle this better, like throwing a custom exception
    }
  }
}
