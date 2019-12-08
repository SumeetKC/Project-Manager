import { Component, OnInit } from '@angular/core';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  projectaddstatus = false;
  projectItems: any[];
  search: string;
  userItems: any[];
  dateString: string;
  isValidDate: boolean;
  update = false;
  error: any = {isError: false, errorMessage: ''};
  isDisabled = true;

  constructor(private projectservice: ProjectService, private userservice: UserService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.project.priority = 0;
    this.update = false;
    this.dateString = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    this.project.startDate = new Date();
    console.log(this.project.startDate);

    this.userservice.viewUser().subscribe(userItems => {this.userItems = userItems; });
    this.projectservice.viewProject().subscribe(projectItems => {this.projectItems = projectItems; });
  }

  enableDate() {
    this.isDisabled = !this.isDisabled;
    return;
}

  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = {isError: true, errorMessage: 'Start date and end date are required.'};
      this.isValidDate = false;
    }

    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = {isError: true, errorMessage: 'End date should be greater then start date.'};
      this.isValidDate = false;
    }
    return this.isValidDate;
  }

  enableUpdate(project: Project) {
    this.project = project;
    this.update = true;
  }

  addProject(project: Project): void  {
    this.isValidDate = this.validateDates(this.project.startDate.toString(), this.project.endDate.toString());
    if (this.isValidDate) {
      this.projectservice.addProject(project).subscribe(data => { if (data) {
        this.ngOnInit();
      }
    });
  }
  }

  updateProject(project: Project): void  {
    this.isValidDate = this.validateDates(this.project.startDate.toString(), this.project.endDate.toString());
    if (this.isValidDate) {
      this.projectservice.updateProject(project).subscribe(data => { if (data) {
        this.ngOnInit();
      }
    });
  }
  }

}
