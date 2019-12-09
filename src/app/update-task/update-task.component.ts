import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskservice: TaskService, private route: ActivatedRoute, private router: Router) { }

  task: Task = new Task();
  endTaskStatus: boolean;
  id: number;

  ngOnInit() {
    this.endTaskStatus = false;
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

    this.taskservice.getTask(this.id).subscribe(task => {this.task = task; });
  }

updateTask(task: Task) {
    this.endTaskStatus = false;
    this.taskservice.updateTask(task).subscribe(data => {if (data) {
      this.task = data;
      this.router.navigateByUrl('/app-view-task');
      }
    });
  }

}
