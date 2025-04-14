import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompliteIniciative } from '../model/complite-iniciative';
import { Iniciative } from '../model/iniciative';
import { Ods } from '../model/ods';
import { ModuleService } from './module.service';
import { OdsService } from './ods.service';
import { firstValueFrom, Observable } from 'rxjs';
import { NewIniciative } from '../model/new-iniciative';

@Injectable({
  providedIn: 'root',
})
export class IniciativeService {
  odsList!: Ods[];
  iniciativeList: Iniciative[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  iniciativeCompliteList: CompliteIniciative[] = [];

  constructor(private http: HttpClient, private odsService: OdsService) {}

  async ngOnInit() {
    this.odsList = await this.odsService.getOds();
  }

  async getIniciatives(): Promise<CompliteIniciative[]> {
    return firstValueFrom(
      this.http.get<CompliteIniciative[]>(
        'http://127.0.0.1:8000/iniciatives',
        {
          headers: this.headers,
          observe: 'response',
        }
      )
    ).then(response => response.body as CompliteIniciative[]);
  }

  getIniciativess(): Observable<CompliteIniciative[]> {
    return this.http.get<CompliteIniciative[]>('http://127.0.0.1:8000/iniciatives/complete');
  }

  async getCompliteIniciativas() {
    return firstValueFrom(
      this.http.get<CompliteIniciative[]>(
        'http://127.0.0.1:8000/iniciatives/complete',
        {
          headers: this.headers,
          observe: 'response',
        }
      )
    ).then((response) => {
      const iniciativas = response.body as any[];
      // map companies -> externalEntities
      return iniciativas.map((item) => {
        item.externalEntities = item.companies;
        delete item.companies;
        return item as CompliteIniciative;
      });
    });
  }
  

  async addCompliteIniciative(iniciative: NewIniciative) {
    try {
      const response = await firstValueFrom(
        this.http.post<{ message: string }>(
          'http://127.0.0.1:8000/iniciatives/',
          iniciative,
          {
            headers: this.headers,
            observe: 'response',
          }
        )
      );
      return response.body?.message || 'Unknown response';
    } catch (error) {
      console.error('Error adding initiative:', error);
      return '';
    }
  }

  async deleteIniciative(id: number): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.delete<{ message: string }>(
          'http://127.0.0.1:8000/iniciatives/' + id,
          {
            headers: this.headers,
            observe: 'response',
          }
        )
      );
      return response.body?.message || 'Unknown response';
    } catch (error) {
      console.error('Error deleting initiative:', error);
      return '';
    }
  }

  getCompliteIniciativeById(id: number) {
    return firstValueFrom(
      this.http.get<CompliteIniciative>(
        'http://127.0.0.1:8000/iniciatives/' + id,
        {
          headers: this.headers,
          observe: 'response',
        }
      )
    ).then((response) => {
      const item = response.body as any;
      item.externalEntities = item.companies;
      delete item.companies;
      return item as CompliteIniciative;
    });
  }

  async updateCompliteIniciative(iniciative: NewIniciative) {
    try {
      const response = await firstValueFrom(
        this.http.put<{ message: string }>(
          'http://127.0.0.1:8000/iniciatives/' + iniciative.id,
          iniciative,
          {
            headers: this.headers,
            observe: 'response',
          }
        )
      );
      return response.body?.message || 'Unknown response';
    } catch (error) {
      console.error('Error adding initiative:', error);
      return '';
    }
  }
}
