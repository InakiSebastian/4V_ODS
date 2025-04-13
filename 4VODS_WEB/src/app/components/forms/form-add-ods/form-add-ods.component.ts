import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OdsService } from '../../../services/ods.service';
import { Ods } from '../../../model/ods';
import { StaticService } from '../../../services/static-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-add-ods',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form-add-ods.component.html',
  styleUrl: './form-add-ods.component.scss'
})
export class FormAddOdsComponent {
  odsForm!: FormGroup;
  dimensions! : {id: number, name: string}[] 

  constructor(private fb: FormBuilder, private odsService: OdsService, private staticService: StaticService){
    this.dimensions = this.staticService.getDimensions();
  }

  async ngOnInit() {
    this.odsForm = this.fb.group({
      name: ['', Validators.required],
      dimension: ['', Validators.required],
    });
  }
  

  submit(){
    if (this.odsForm.valid) {
      console.log(this.odsForm.value);
      alert(this.odsForm.value.dimension)
      this.odsService.createODS(new Ods(-1,this.odsForm.value.dimension, this.odsForm.value.name));
      this.odsForm.reset();
      alert("¡Ods agregado correctamente!");
    }
  }

  reset(){
    this.odsForm.reset();
  }
}
