import { Injectable } from '@angular/core';
import { Degree } from '../model/degree';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  dgrees: Degree[] = [
    new Degree(1, 'DAM'),
    new Degree(2, 'ASIR'),
    new Degree(3, 'DAW'),
    new Degree(4, 'CINJUSTO')
  ];

  constructor() { }

  getDegrees(): Degree[] {
    return this.dgrees;
  }

  getDegreeById(degreeSelect: number) {
    return this.dgrees.filter(degree => degree.Id == degreeSelect)[0];
  }

}
