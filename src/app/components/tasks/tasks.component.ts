import { Component, OnInit } from '@angular/core';
import { Tasks } from '../../models/tasks.model';
import { TasksService } from '../../services/tasks.service';
import { 
  Router,
  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService]
})
export class TasksComponent implements OnInit {

  newTask: Tasks = new Tasks();
  listId: number;

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  addTask() {
    this.newTask.list_id = this.listId;
    this.tasksService.addTask(this.newTask);
    this.newTask = new Tasks();
  }

  toggleTaskComplete(task) {
    this.tasksService.toggleTaskComplete(task);
  }

  removeTask(task) {
    this.tasksService.deleteTaskById(task.id);
  }

  getAllTasksByListId(): Tasks[]{
    this.route.params
                .subscribe(params => {
                  this.listId = +params.id;
               })
    return this.tasksService.getAllTasksByListId(this.listId);
  }

  markAllDone(){
    this.getAllTasksByListId()
                    .filter(v => !v.complete)
                    .map(v => this.toggleTaskComplete(v));
  }

  get tasks() {
    return this.getAllTasksByListId()
                           .filter(v => !v.complete);
  }

  get dones() {
    return this.getAllTasksByListId()
                           .filter(v => v.complete);
  }

}
