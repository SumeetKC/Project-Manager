import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  private apiUrl = 'http://localhost:8080/v1';

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }

  // Adding new task
  addUser(user: User): Observable<User> {
    console.log('Sending data is' + JSON.stringify(user));
    return this.http.post<Task>(this.apiUrl + '/adduser', user ).pipe( map(() => user), catchError(this.handleError));
  }

  // Updating task
  updateUser(user: User): Observable<User> {
    return this.http.put<Task>(this.apiUrl + '/updateuser', user).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

 // Read all REST Items
 viewUser(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl + '/users').pipe(map(data => data));
  }

  // Get a task based on task id
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/user/' + id).pipe(map(data => data));
    }

  }
