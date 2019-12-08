import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private taskservice: TaskService) { }

  task: Task = new Task();
  taskaddstatus = false;

  ngOnInit() {
  }

  addTask(task: Task): void  {
    this.taskservice.addTask(task).subscribe(data => { if (data) {
      this.taskaddstatus = true;
 }
    });
  }
}
