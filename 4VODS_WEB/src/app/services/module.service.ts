import { Injectable } from '@angular/core';
import { Module } from '../model/module';
import { FormControl } from '@angular/forms';
import { Degree } from '../model/degree';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private modules=[
    new Module(1,1,"Acceso a Datos"),
    new Module(2,2,"Programación"),
    new Module(3,3,"Desarrollo de Aplicaciones Web"),
    new Module(4,1,"Desarrollo Multiplataforma"),
    new Module(5,2," de Aplicaciones"),
    new Module(6,3,"Desarrollo de  "),
    new Module(7,1,"Desarrollo  Multiplataforma"),
    new Module(8,2,"Desarrollo de Aplicaciones Multiplataforma"),
    new Module(9,3," de Aplicaciones Multiplataforma"),
    new Module(10,1,"Desarrollo Aplicaciones "),
    new Module(11,2,"Desarrollo de Aplicaciones Multiplataforma"),
    new Module(12,3,"Desarrollo de  Multiplataforma"),
  ]

  degree_modules: (DegreeModules[]|null) = null;

  constructor() { }

  getModules(): Module[] {
    return this.modules;
  }

  getModulesByDegree(Id: number) {
    return this.modules.filter(module => module.IdCiclo == Id);
  }
  
  
}

export class DegreeModules extends Degree {
  modules: ModuleCheck[];

  constructor(degree: Degree, modules: ModuleCheck[]) {
    super(degree.Id, degree.Name);
    this.modules = modules;
  }
}

export class ModuleCheck extends Module {
  checked: FormControl;
  controlName: string;

  constructor(module: Module) {
    super(module.Id, module.IdCiclo, module.Name);
    this.controlName = `${module.Id}${module.IdCiclo}`;
    this.checked = new FormControl(false);
  }
}
