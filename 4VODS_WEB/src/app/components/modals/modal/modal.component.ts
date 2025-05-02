import { Component, Input } from '@angular/core';
import { IniciativeDetailComponent } from '../../iniciative-detail/iniciative-detail.component';
import { FormAddIniciativeComponent } from '../../form-add-iniciative/form-add-iniciative.component';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  imports: [IniciativeDetailComponent, FormAddIniciativeComponent, ConfirmModalComponent, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() contentType: string = "null"; //'detail' | 'form' | 'delete'| 'loader'

  iniciative: CompliteIniciative | null = null;

  showModal: boolean = false;

  subscription!: Subscription

  constructor(private modalService: ModalService) {
    this.subscription = this.modalService.open$.subscribe((modInf) => this.showModal = modInf != null);
  }

   ngOnInit() {
    this.modalService.open$.subscribe(modInf => {
      if (modInf == null) {
        this.contentType = "null";
        this.iniciative = null;
      }
      else {
        this.contentType = modInf.modalType;
        this.iniciative = modInf.iniciative;
        console.log("Esto es en le modal ",this.iniciative)
      }
    })
   }

   delete(){
    this.contentType = "delete"
  }

  closeModal(){
    this.modalService.closeModal();
    this.showModal = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); 
    }
  }
}
