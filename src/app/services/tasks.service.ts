import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks.model';
@Injectable()
export class TasksService {

  tasks: Tasks[] = [
    { list_id: 0, id: 0, title: "Take out the trash", complete: false},
    { list_id: 0, id: 1, title: "Buy bread", complete: false},
    { list_id: 0, id: 2, title: "Teach penguins to fly", complete: false},
    { list_id: 0, id: 3, title: "Go market", complete: true}, 
    { list_id: 1, id: 4, title: "Take out the trash", complete: false},
    { list_id: 1, id: 5, title: "Buy bread", complete: false},
    { list_id: 1, id: 6, title: "Teach penguins to fly", complete: false},
    { list_id: 2, id: 7, title: "Go market", complete: true}, 
    { list_id: 2, id: 8, title: "Take out the trash", complete: false},
    { list_id: 3, id: 9, title: "Buy bread", complete: false},
    { list_id: 3, id: 10, title: "Teach penguins to fly", complete: false},
    { list_id: 3, id: 11, title: "Go market", complete: true}, 
  ];

  lastId: number = this.tasks.length - 1;

  constructor() { }

  // Simulate POST /tasks
  addTask(task: Tasks): TasksService {
    if (!task.id) {
      task.id = ++this.lastId;
    }
    this.tasks.push(task);
    return this;
  }

  // Simulate DELETE /tasks/:id
  deleteTaskById(id: number): TasksService {
    this.tasks = this.tasks
      .filter(task => task.id !== id);
    return this;
  }

  // Simulate PUT /tasks/:id
  updateTaskById(id: number, values: Object = {}): Tasks {
    let task = this.getTaskById(id);
    if (!task) {
      return null;
    }
    Object.assign(task, values);
    return task;
  }

  // Simulate GET /tasks
  getAllTasksByListId(list_id: number): Tasks[] {
    return this.tasks
                  .filter(task => task.list_id === list_id);
  }

  // Simulate GET /tasks/:id
  getTaskById(id: number): Tasks {
    return this.tasks
      .filter(task => task.id === id)
      .pop();
  }

  // Toggle task complete
  toggleTaskComplete(task: Tasks){
    let updatedTask = this.updateTaskById(task.id, {
      complete: !task.complete
    });
    return updatedTask;
  }
}
