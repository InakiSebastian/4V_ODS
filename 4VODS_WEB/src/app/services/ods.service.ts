import { Injectable } from '@angular/core';
import { Ods } from '../model/ods';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OdsService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  selectedOds: Ods[] = [];

  constructor(private http: HttpClient) { }

  //Ods
  getOds() {
    return firstValueFrom(
      this.http.get<Ods[]>('http://127.0.0.1:8000/ods/ods', {
        headers: this.headers,
        observe: 'response',
      })
    ).then((response) => response.body as Ods[]);
  }

  createODS(ods: Ods) {
    return firstValueFrom(
      this.http
        .post<Ods>('http://127.0.0.1:8000/ods', ods, {
          headers: this.headers,
          observe: 'response',
        })
    ).then(response => response.body as Ods);
  }

  editODS(ods: Ods) {
    return firstValueFrom(
      this.http
        .put<Ods>('http://127.0.0.1:8000/ods/' + ods.id, ods, {
          headers: this.headers,
          observe: 'response',
        })
    ).then(response => response.body as Ods);
  }

  async getOdsById(id: number): Promise<number | undefined> {
    return (await this.getOds()).find((o) => o.id === id)?.id;
  }

  //SelectedOds
  getSelectedOds(): Ods[] {
    return this.selectedOds;
  }

  pushSelectedOds(ods: Ods) {
    this.selectedOds.push(ods);
  }

  removeSelectedOds(id: number): Ods[] {
    return (this.selectedOds = this.selectedOds.filter((ods) => ods.id !== id));
  }

  clearSelectedOds(): Ods[] {
    return (this.selectedOds = []);
  }

  setSelectedOds(ods: Ods[]) {
    this.selectedOds = ods;

  }
}
