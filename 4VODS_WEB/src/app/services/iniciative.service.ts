import { Injectable } from '@angular/core';
import { Iniciative } from '../model/iniciative';

@Injectable({
  providedIn: 'root'
})
export class IniciativeService {
  iniciativeList: Iniciative [] = [
    new Iniciative(1, 'Reciclaje loco', 'Actividad para concienciar sobre el reciclaje', new Date, new Date, 30, "pechugas en salsa"),
    new Iniciative(2, 'Róbale a tu jefe', 'Redistribución de la riqueza', new Date, new Date, 65.5, "pechugas en salsa"),
    new Iniciative(3, 'Comida solidaria', 'Concienciación sobre la reducción del hambre', new Date, new Date, 30, "pechugas en salsa"),
    new Iniciative(4, 'Peces vivos', 'Concienciación sobre la desintoxicación de nuestros ríos', new Date, new Date, 30, "pechugas en salsa"),
    new Iniciative(5, 'Paneles Solares', 'Energía sostenible y no contaminante', new Date, new Date, 30, "pechugas en salsa"),
    new Iniciative(6, 'Repoblación de la Selva del Irati', 'Acción por el clima', new Date, new Date, 30, "pechugas en salsa"),
  ]

  constructor() { }

  public getIniciatives(){
    return this.iniciativeList;
  }

  
}
