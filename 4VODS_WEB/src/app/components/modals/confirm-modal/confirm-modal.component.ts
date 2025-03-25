import { Component, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CompliteIniciative } from '../../../model/complite-iniciative';
import { IniciativeService } from '../../../services/iniciative.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() id: number|null = null;
  @Input() nameIni: string|null = null;

  //varaibles de visualización
  title: string = " la eliminación de la Iniciativa: "

  constructor(private modalService: ModalService, private iniciativeService: IniciativeService){
    
  }

  async ngOnInit(){ 
    if(this.id== undefined){
      alert("No se ha encontrado ningúna iniciativa con el Id: " + this.id);
    }
    else{
      this.title+=this.nameIni
    }
  }
  
}
