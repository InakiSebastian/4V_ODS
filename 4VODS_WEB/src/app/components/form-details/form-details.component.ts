import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-details',
  imports: [ReactiveFormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss'
})
export class FormDetailsComponent {
  @Input() detailsForm!: FormGroup;

  constructor(){}

  ngOnInit(){
    this.detailsForm?.addControl('name', new FormControl(''));
    this.detailsForm?.addControl('description', new FormControl(''));
    this.detailsForm?.addControl('startDate', new FormControl(''));
    this.detailsForm?.addControl('endDate', new FormControl(''));
    this.detailsForm?.addControl('hours', new FormControl(''));
    this.detailsForm?.addControl('academicYear', new FormControl(''));
    this.detailsForm?.addControl('iniciativeType', new FormControl(''));

  }


}
