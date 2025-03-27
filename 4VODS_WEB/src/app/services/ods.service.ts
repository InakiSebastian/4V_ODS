import { Injectable } from '@angular/core';
import { Ods } from '../model/ods';
import { Iniciative } from '../model/iniciative';
import { firstValueFrom } from 'rxjs';
import { Goal } from '../model/goal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OdsService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json', // O cualquier otro tipo según el backend
  });

  selectedOds: Ods[] = [];

  constructor(private http: HttpClient) {}

  //Ods
  getOds() {
    return firstValueFrom(
      this.http.get<Ods[]>('http://127.0.0.1:8000/ods', {
        headers: this.headers,
        observe: 'response',
      })
    ).then((response) => response.body as Ods[]);
  }

  async getOdsById(id: number): Promise<number | undefined> {
    return (await this.getOds()).find((o) => o.Id === id)?.Id;
  }

  //SelectedOds
  getSelectedOds(): Ods[] {
    return this.selectedOds;
  }
  pushSelectedOds(ods: Ods) {
    this.selectedOds.push(ods);
  }

  removeSelectedOds(id: number): Ods[] {
    return (this.selectedOds = this.selectedOds.filter((ods) => ods.Id !== id));
  }

  clearSelectedOds(): Ods[] {
    return (this.selectedOds = []);
  }

  setOdsselected(ods: Ods[]) {
    this.selectedOds = ods;
  }
}
