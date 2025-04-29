import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDetails } from '../../form-add-iniciative/interfaces/details.interface';

@Component({
  selector: 'app-form-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss',
})
export class FormDetailsComponent {
  @Input() details: IDetails | null = null;

  startDateStr: string = '';
  endDateStr: string = '';

  initialYear: number = new Date().getFullYear();
  finalYear: number = new Date().getFullYear()+1;

  constructor() {}

  ngOnInit() {
    if (this.details) {
      this.startDateStr = new Date(this.details.startDate).toISOString().split('T')[0];
      this.endDateStr = this.details.endDate
        ? new Date(this.details.endDate).toISOString().split('T')[0]
        : '';

      this.details.initialAcademicYear = this.initialYear;
      this.details.finalAcademicYear = this.finalYear;

      console.log('Año inicio ' + this.details.initialAcademicYear);
      console.log(this.details.finalAcademicYear);
    }

    console.log(this.details!.iniciativeType);
  }

  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  updateDate(event: any, endOrStart: string) {
    if (endOrStart === 'start') {
      this.details!.startDate = new Date(event.target.value);
    } else if (endOrStart === 'end') {
      this.details!.endDate = new Date(event.target.value);
    }
  }

  updateAcademicYear(){
    if(this.details){
      this.details.initialAcademicYear = this.initialYear;
      this.details.finalAcademicYear = this.finalYear;
    }
  }
}
