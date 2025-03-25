import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { IniciativeService } from '../../../services/iniciative.service';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  //varaibles de visualización
  title: string = " la eliminación de la Iniciativa: "

  constructor(private modalService: ModalService, private iniciativeService: IniciativeService){
    
  }

  async ngOnInit(){
    var iniciativeId: number = 0;
    await this.modalService.idIniciative$.subscribe((inici)=>{
      iniciativeId = inici;
    });
    var iniciative: CompliteIniciative | undefined;
    this.iniciativeService.getCompliteIniciativeById(iniciativeId).then((inici)=>{
      iniciative = inici
    });
    if(iniciative== undefined){
      alert("No se ha encontrado ningúna iniciativa con el Id: " + iniciativeId);
    }
    else{
      this.title+=iniciative.Name
    }
    
  }
  
}
