import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private taskservice: TaskService ) { }
  taskItems: any[];
  taskName: string;
  parentTask: string;
  priority: number;
  startDate: Date;
  endDate: Date;

  ngOnInit() {
    this.taskservice.viewTask().subscribe(taskItems => {this.taskItems = taskItems; });
  }

  updateEndStatus(task: Task)  {
    this.taskservice.updateEndStatus(task).subscribe(data => {
      if (data) {
        this.ngOnInit();
      }
    });
  }

}
