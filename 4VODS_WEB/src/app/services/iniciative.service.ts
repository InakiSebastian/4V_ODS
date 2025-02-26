import { Injectable } from '@angular/core';
import { Iniciative } from '../model/iniciative';

@Injectable({
  providedIn: 'root'
})
export class IniciativeService {
  iniciativeList: Iniciative [] = [
    new Iniciative(1, 'Reciclaje loco', 'Actividad para concienciar sobre el reciclaje', new Date, new Date, 30, 'Charla'),
    new Iniciative(2, 'Róbale a tu jefe', 'Redistribución de la riqueza', new Date, new Date, 30.5, 'Charla'),
    new Iniciative(3, 'Comida solidaria', 'Concienciación sobre la reducción del hambre', new Date, new Date, 50, 'Proyecto'),
    new Iniciative(4, 'Peces vivos', 'Concienciación sobre la desintoxicación de nuestros ríos', new Date, new Date, 65, 'Taller'),
    new Iniciative(5, 'Paneles Solares', 'Energía sostenible y no contaminante', new Date, new Date, 65, 'Taller'),
    new Iniciative(6, 'Repoblación de la Selva del Irati', 'Acción por el clima', new Date, new Date, 30, 'Charla'),
  ]

  constructor() { }

  public getIniciatives(){
    return this.iniciativeList;
  }

  public deleteIniciative(id: number): void {
    const index = this.iniciativeList.findIndex(iniciative => iniciative.Id === id);
    if (index !== -1) {
      this.iniciativeList.splice(index, 1);
    }
  }
  
  
}
