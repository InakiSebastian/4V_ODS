import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompliteIniciative } from '../model/complite-iniciative';
import { Iniciative } from '../model/iniciative';
import { Ods } from '../model/ods';
import { ModuleService } from './module.service';
import { OdsService } from './ods.service';
import { firstValueFrom } from 'rxjs';

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

  async getCompliteIniciativas() {
    var a = firstValueFrom(
      this.http.get<CompliteIniciative[]>(
        'http://127.0.0.1:8000/iniciatives/complete',
        {
          headers: this.headers,
          observe: 'response',
        }
      )
    ).then((response) => response.body as CompliteIniciative[]);
    return a;
  }

  async addCompliteIniciative(iniciative: CompliteIniciative) {
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
    ).then((response) => response.body as CompliteIniciative);
  }

  getSimpleIniciatives() {}

  updateCompliteIniciative(iniciative: CompliteIniciative): void {
    const inici = this.iniciativeCompliteList.find(
      (i) => i.id === iniciative.id
    );
    inici!.name = iniciative.name;
    inici!.description = iniciative.description;
    inici!.startDate = iniciative.startDate;
    inici!.endDate = iniciative.endDate!;
    inici!.hours = iniciative.hours;
    inici!.schoolYear = iniciative.schoolYear;
    inici!.ods = iniciative.ods;
    inici!.type = iniciative.type;
    inici!.teachers = iniciative.teachers;
    inici!.modules = iniciative.modules;
    inici!.diffusions = iniciative.diffusions;
    inici!.goals = iniciative.goals;
  }
}
