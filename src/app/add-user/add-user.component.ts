import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  useraddstatus = false;
  constructor(private userservice: UserService) { }

  ngOnInit() {
  }

  addUser(user: User): void  {
    this.userservice.addUser(user).subscribe(data => { if (data) {
    this.useraddstatus = true;
 }
    });
  }

}
