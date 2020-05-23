import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskRequest } from '../interfaces/task-request.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private http: HttpClient) { }

  addTask(request: TaskRequest): Observable<any> {
    return this.http.post<TaskRequest>(`${environment.BASEURL}/api/task-manager/add-task`, request);
  }
}
