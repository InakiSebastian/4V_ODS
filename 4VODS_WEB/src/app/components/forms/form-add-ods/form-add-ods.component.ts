import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-ods',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-add-ods.component.html',
  styleUrl: './form-add-ods.component.scss'
})
export class FormAddOdsComponent {
  odsForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  async ngOnInit() {
    this.odsForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit(){
    if (this.odsForm.valid) {
      console.log(this.odsForm.value);
      this.odsForm.reset();
      alert("¡Ods agregado correctamente!");
    }
  }

  reset(){
    this.odsForm.reset();
  }
}
