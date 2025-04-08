import { Injectable } from '@angular/core';
import { ExternalEntity } from '../model/external-entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalEntitiesService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  constructor(private http: HttpClient) { }

  async getExternalEntities() {
    return firstValueFrom(
      this.http.get<ExternalEntity[]>('http://127.0.0.1:8000/company/', {
        headers: this.headers,
        observe: 'response',
      })
    ).then((response) => response.body as ExternalEntity[]);
  }

  async createExternalEntity(name: string) {
    //TODO CREAR LA ENTIDAD Y RECOGER EL ID PARA DEVOLVERLO
    return 1;
  }
}
