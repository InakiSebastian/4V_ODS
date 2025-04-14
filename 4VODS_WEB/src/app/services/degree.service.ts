import { Injectable } from '@angular/core';
import { Degree } from '../model/degree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DegreeService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  constructor(private http: HttpClient) { }

  getDegrees(): Promise<Degree[]> {
    return firstValueFrom(
      this.http.get<Degree[]>('http://127.0.0.1:8000/degree/', {
        headers: this.headers,
        observe: 'response',
      })
    ).then((response) => response.body as Degree[]);
  }

  createDegree(degree: Degree) {
    return firstValueFrom(
      this.http
        .post<Degree>('http://127.0.0.1:8000/degree', degree, {
          headers: this.headers,
          observe: 'response',
        })
    ).then(response => response.body as Degree);
  }

  editDegree(degree: Degree) {
    return firstValueFrom(
      this.http
        .put<Degree>('http://127.0.0.1:8000/degree/' + degree.id, degree, {
          headers: this.headers,
          observe: 'response',
        })
    );
  }

  async getDegreeById(degreeSelect: number) {
    return (await this.getDegrees()).filter(
      (degree) => degree.id == degreeSelect
    )[0];
  }
}
