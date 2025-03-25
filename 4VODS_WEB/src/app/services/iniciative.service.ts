import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompliteIniciative } from '../model/complite-iniciative';
import { Iniciative } from '../model/iniciative';
import { Ods } from '../model/ods';
import { ModuleService } from './module.service';
import { OdsService } from './ods.service';

@Injectable({
  providedIn: 'root',
})
export class IniciativeService {
  odsList: Ods[];
  iniciativeList: Iniciative[] = [];

  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  iniciativeCompliteList: CompliteIniciative[] = [];

  constructor(
    private http: HttpClient,
    private odsService: OdsService,
    private moduleService: ModuleService
  ) {
    this.odsList = this.odsService.getOds();
  }

  getIniciatives() {
    return this.http.get<CompliteIniciative[]>(
      'http://127.0.0.1:8000/iniciatives',
      {
        headers: this.headers,
        observe: 'response', // Esto te permite ver la respuesta completa
      }
    );
  }

  getCompliteIniciativas() {
    return this.iniciativeCompliteList;
  }

  addCompliteIniciative(iniciative: CompliteIniciative) {
    this.iniciativeCompliteList.push(iniciative);
  }

  deleteIniciative(id: number): void {
    this.iniciativeList = this.iniciativeList.filter(
      (iniciative) => iniciative.Id !== id
    );
  }

  getCompliteIniciativeById(id: number) {
    return this.http.get<CompliteIniciative>(
      'http://127.0.0.1:8000/iniciatives/' + id,
      {
        headers: this.headers,
        observe: 'response',
      }
    );
  }

  updateCompliteIniciative(iniciative: CompliteIniciative): void {
    const inici = this.iniciativeCompliteList.find(
      (i) => i.Id === iniciative.Id
    );
    inici!.Name = iniciative.Name;
    inici!.Description = iniciative.Description;
    inici!.StartDate = iniciative.StartDate;
    inici!.EndDate = iniciative.EndDate!;
    inici!.Hours = iniciative.Hours;
    inici!.schoolYear = iniciative.schoolYear;
    inici!.Ods = iniciative.Ods;
    inici!.Type = iniciative.type;
    inici!.Teachers = iniciative.Teachers;
    inici!.Modules = iniciative.Modules;
    inici!.Difusions = iniciative.Difusions;
    inici!.Goals = iniciative.Goals;
  }
}
