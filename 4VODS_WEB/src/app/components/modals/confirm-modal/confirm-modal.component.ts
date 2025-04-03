import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { IniciativeService } from '../../../services/iniciative.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  //varaibles de visualización
  title: string = " la eliminación de la Iniciativa: "

  id: number = 0;
  name: string = "ae";

  inputName: string = "";

  valid: boolean = false;

  constructor(private modalService: ModalService, private iniciativeService: IniciativeService){
  }

  async ngOnInit() {
    try {
      // Obtener el ID de la iniciativa
      const iniciativeId = await firstValueFrom(this.modalService.idIniciative$);
  
      // Obtener los datos de la iniciativa
      const iniciative = await this.iniciativeService.getCompliteIniciativeById(iniciativeId);
      if (!iniciative) {
        alert("No se ha encontrado ninguna iniciativa con el Id: " + iniciativeId);
      } else {
        this.id = iniciative.id;
        this.title += iniciative.name;
        this.name = iniciative.name;
      }
    } catch (error) {
      console.error("Error obteniendo la iniciativa:", error);
    }
  }

  closeModal(){
    this.modalService.closeModal();
  }

  delete(){
    this.iniciativeService.deleteIniciative(this.id);
    this.modalService.rechargeList();
    this.modalService.isLoading();
    this.modalService.closeModal();
  }
  
}
