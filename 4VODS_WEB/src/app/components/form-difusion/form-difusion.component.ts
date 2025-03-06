import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-difusion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-difusion.component.html',
  styleUrl: './form-difusion.component.scss'
})
export class FormDifusionComponent {
  @Input() difusionForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.difusionForm.addControl('difusions', new FormArray([]))
  }

  //DIFUSIÓN
  get Difusions(): FormArray {
    return this.difusionForm.get('difusions') as FormArray;
  }

  createDifusionInput() {
    return this.fb.group({
      type: new FormControl(''),
      link: new FormControl('')
    });
  }

  addDifusion() {
    this.Difusions.push(this.createDifusionInput());
  }

  removeDifusion(index: number) {
    this.Difusions.removeAt(index);
  }
}
