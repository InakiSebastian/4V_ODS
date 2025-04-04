import { Injectable } from '@angular/core';
import { Module } from '../model/module';
import { FormControl } from '@angular/forms';
import { Degree } from '../model/degree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  degree_modules: DegreeModules[] | null = null;

  constructor(private http: HttpClient) {}

  getModules(): Promise<Module[]> {
    return firstValueFrom(
      this.http.get<Module[]>('http://127.0.0.1:8000/module', {
        headers: this.headers,
        observe: 'response',
      })
    ).then((response) => response.body as Module[]);
  }

  async getModulesByDegree(id: number) {
    return (await this.getModules()).filter((module) => module.idDegree == id);
  }

  getCheckedModules(): Module[] | null {
    var modules: ModuleCheck[] = [];
    if (this.degree_modules == null) return null;
    this.degree_modules!.forEach((degree) => {
      //recoge todos los módulos que hayan sido seleccionados entre los ciclos seleccionados
      degree.modules.forEach((module) => {
        if (module.checked.value) {
          modules.push(module);
        }
      });
    });
    return modules.map(
      (module) => new Module(module.id, module.idDegree, module.name)
    );
  }
}

export class DegreeModules extends Degree {
  modules: ModuleCheck[];

  constructor(degree: Degree, modules: ModuleCheck[]) {
    super(degree.id, degree.name);
    this.modules = modules;
  }
}

export class ModuleCheck extends Module {
  checked: FormControl;
  controlName: string;

  constructor(module: Module, checked: boolean = false) {
    super(module.id, module.idDegree, module.name);
    this.controlName = `${module.id}${module.idDegree}`;
    this.checked = new FormControl(checked);
    this.checked.setValue(checked);
  }
}
