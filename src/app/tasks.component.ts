import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks';
import { TasksService } from './tasks.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {

  newTask: Tasks = new Tasks();


  constructor(
    private tasksService: TasksService
  ) { }

  ngOnInit() {
  }

  addTask() {
    this.tasksService.addTask(this.newTask);
    this.newTask = new Tasks();
  }

  toggleTaskComplete(task) {
    this.tasksService.toggleTaskComplete(task);
  }

  removeTask(task) {
    this.tasksService.deleteTaskById(task.id);
  }

  markAllDone(){
    this.tasksService.getAllTasks()
                    .filter(v => !v.complete)
                    .map(v => this.toggleTaskComplete(v));
  }

  get tasks() {
    return this.tasksService.getAllTasks()
                           .filter(v => !v.complete);
  }

  get dones() {
    return this.tasksService.getAllTasks()
                           .filter(v => v.complete);
  }

}
