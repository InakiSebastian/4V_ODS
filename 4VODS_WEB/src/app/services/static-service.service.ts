import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  dimensions = [
    { id: 1, name: 'Social' },
    { id: 2, name: 'Económico' },
    { id: 3, name: 'Medioambiental' }
  ];

  constructor() { }

  getDimensions() {
    return this.dimensions
  }
}
