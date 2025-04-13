import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-degree',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-degree.component.html',
  styleUrl: './form-add-degree.component.scss'
})
export class FormAddDegreeComponent {
  
  degreeForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  async ngOnInit() {
    this.degreeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit(){
    if (this.degreeForm.valid) {
      console.log(this.degreeForm.value);
      this.degreeForm.reset();
      alert("¡Ciclo agregado correctamente!");
    }
  }

  reset(){
    this.degreeForm.reset();
  }
}
