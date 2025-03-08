import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IRrss } from '../form-add-iniciative/interfaces/rrss.interface';
import { Difusion } from '../../model/difusion';

@Component({
  selector: 'app-form-difusion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-difusion.component.html',
  styleUrl: './form-difusion.component.scss'
})
export class FormDifusionComponent {
  @Input() difusionForm!: FormGroup;

  @Input() difusionR: IRrss | null = null

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.difusionForm.addControl('difusions', new FormArray([]))

    if (this.difusionR != null) {
      this.difusionR.rrss.forEach(difusion => {
        this.addDifusion(difusion)
      })
    }
  }

  //DIFUSIÓN
  get Difusions(): FormArray {
    return this.difusionForm.get('difusions') as FormArray;
  }

  createDifusionInput(difusion: Difusion | null): FormGroup {
    return this.fb.group({
      type: new FormControl(difusion==null?'':difusion.Type),
      link: new FormControl(difusion==null?'':difusion.Link),
    });
  }

  addDifusion(difusion: Difusion | null = null) {
    this.Difusions.push(this.createDifusionInput(difusion));
  }

  removeDifusion(index: number) {
    this.Difusions.removeAt(index);
  }
}
