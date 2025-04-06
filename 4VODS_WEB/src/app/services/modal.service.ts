import { Injectable } from '@angular/core';
import {  Observable, ReplaySubject } from 'rxjs';
import { CompliteIniciative } from '../model/complite-iniciative';
import { IModalInformation } from '../model/modal-information.interface';
import { OdsService } from './ods.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private odsService: OdsService, private goalService: OdsService) { }

  private idIniciative: ReplaySubject<number> = new ReplaySubject(1);
  idIniciative$: Observable<number> = this.idIniciative.asObservable();



  changeIdIniciative(idIniciative: number) {
    this.idIniciative.next(idIniciative);
  }

  cleanIdIniciative() {
    this.idIniciative.next(-1);
  }

  private open: ReplaySubject<IModalInformation | null> = new ReplaySubject(1);
  open$: Observable<IModalInformation | null> = this.open.asObservable();


  openModal(modalType: string, idIniciative: CompliteIniciative | null) {
    this.odsService.setSelectedOds([]);
    this.goalService.setSelectedOds([]);

    const mI : IModalInformation = { modalType: modalType, iniciative: idIniciative };
    this.open.next(mI);
  }

  closeModal() {
    this.open.next(null);
  }

  private recharge: ReplaySubject<boolean> = new ReplaySubject(1);
  recharge$: Observable<boolean> = this.recharge.asObservable();


  rechargeList() {
    this.recharge.next(true);
  }

  private loading: ReplaySubject<boolean> = new ReplaySubject(1);
  loading$: Observable<boolean> = this.loading.asObservable();



  isLoading() {
    this.loading.next(true);
  }

  stopLoading() {
    this.loading.next(false);
  }
}
