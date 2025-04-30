import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

constructor(private httpClient: HttpClient) { }

route: string = 'http://127.0.0.1:8000/indicators/iniciatives';

getSchoolYears(): Observable<string[]>{
  return this.httpClient.get<string[]>('http://127.0.0.1:8000/options/schoolYears');
}

getNumberIniciatives(){
  return this.httpClient.get(this.route + '/countGrouped');
}

getNumberIniciativesBySchoolYear() {
  return this.httpClient.get(this.route + '/count');
} 

getNumberIniciativesByOdsAndSchoolYear() {
  return this.httpClient.get(this.route + '/ods/grouped')
}

getNumberIniciativesByDegreeAndSchoolYear() {

}

getHoursBySchoolYear(){
  return this.httpClient.get(this.route + '/hoursByYear')
}



}
