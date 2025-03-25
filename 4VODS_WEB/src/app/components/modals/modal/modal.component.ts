import { Component, Input } from '@angular/core';
import { IniciativeDetailComponent } from '../../iniciative-detail/iniciative-detail.component';
import { FormAddIniciativeComponent } from '../../form-add-iniciative/form-add-iniciative.component';
import { Iniciative } from '../../../model/iniciative';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [IniciativeDetailComponent, FormAddIniciativeComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() contentType: string = "null"; //'detail' | 'form'

  iniciative: CompliteIniciative | null = null;

  constructor(private modalService: ModalService) {
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

}
