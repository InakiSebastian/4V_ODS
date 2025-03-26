import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor() { }

  private teachers: Teacher[] = [
    new Teacher(1, 'Miguel Godyena'),
    new Teacher(2, 'Unai Godyena'),
    new Teacher(3, 'Miguel Goñi'),
    new Teacher(4, 'Mikel Goñi'),
    new Teacher(5, 'Silvia Biwiudha'),
    new Teacher(6, 'Miguel Godyena'),
    new Teacher(7, 'Unai Godyena'),
    new Teacher(8, 'Miguel Goñi'),
    new Teacher(9, 'Mikel Goñi'),
    new Teacher(10, 'Silvia Biwiudha'),
  ];

  get Teachers(): Teacher[] {
    return this.teachers;
  }
}
