import { Component, Input } from '@angular/core';
import { IniciativeDetailComponent } from '../../iniciative-detail/iniciative-detail.component';
import { FormAddIniciativeComponent } from '../../form-add-iniciative/form-add-iniciative.component';
import { Iniciative } from '../../../model/iniciative';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal',
  imports: [IniciativeDetailComponent, FormAddIniciativeComponent, ConfirmModalComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() contentType: string = "null"; //'detail' | 'form' | 'delete'

  iniciative: CompliteIniciative | null = null;

  constructor(private modalService: ModalService) {}

   ngOnInit() {
    this.modalService.open$.subscribe(modInf => {
      if (modInf == null) {
        this.contentType = "null";
        this.iniciative = null;
      }
      else {
        this.contentType = modInf.modalType;
        this.iniciative = modInf.iniciative;
      }
    })
   }

   delete(){
    this.contentType = "delete"
  }
}
