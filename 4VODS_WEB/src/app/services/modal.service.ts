import { Injectable } from '@angular/core';
import {  Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private idIniciative: ReplaySubject<number> = new ReplaySubject(1);
  idIniciative$: Observable<number> = this.idIniciative.asObservable();



  changeIdIniciative(idIniciative: number) {
    this.idIniciative.next(idIniciative);
  }

  cleanIdIniciative() {
    this.idIniciative.next(-1);
  }

  private open: ReplaySubject<boolean> = new ReplaySubject(1);
  open$: Observable<boolean> = this.open.asObservable();


  openModal() {
    this.open.next(true);
  }

  closeModal() {
    this.open.next(false);
  }

  private recharge: ReplaySubject<boolean> = new ReplaySubject(1);
  recharge$: Observable<boolean> = this.recharge.asObservable();


  rechargeList() {
    this.recharge.next(true);
  }
}
