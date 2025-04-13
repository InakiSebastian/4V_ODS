import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Degree } from '../model/degree';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  selectedTeachers: Teacher[] | null = [];
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  constructor(private http: HttpClient) { }



  getTeachers() {
    return firstValueFrom(
      this.http.get<Teacher[]>(
        'http://127.0.0.1:8000/teacher/teachers',
        {
          headers: this.headers,
          observe: 'response',
        }
      )).then(response => response.body as Teacher[]);
  }
}
