import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IDetails } from '../form-add-iniciative/interfaces/details.interface';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-form-details',
  imports: [ReactiveFormsModule, FormatDatePipe],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss'
})
export class FormDetailsComponent {
  @Input() detailsForm!: FormGroup;

  @Input() details: IDetails | null = null;

  constructor() { }

  ngOnInit() {
    this.detailsForm?.addControl('name', new FormControl(''));
    this.detailsForm?.addControl('description', new FormControl(''));
    this.detailsForm?.addControl('startDate', new FormControl(''));
    this.detailsForm?.addControl('endDate', new FormControl(null));
    this.detailsForm?.addControl('hours', new FormControl(''));
    this.detailsForm?.addControl('academicYear', new FormControl(''));
    this.detailsForm?.addControl('iniciativeType', new FormControl(''));

    //alert(this.details!.startDate + ' editando ' + this.details!.endDate);
  }
}
