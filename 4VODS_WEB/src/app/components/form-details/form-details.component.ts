import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDetails } from '../form-add-iniciative/interfaces/details.interface';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

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

  constructor() {}

  ngOnInit() {
    if (this.details) {
      this.startDateStr = new Date(this.details.startDate).toISOString().split('T')[0];
      this.endDateStr = this.details.endDate
        ? new Date(this.details.endDate).toISOString().split('T')[0]
        : '';
    }
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
    alert(this.details!.startDate + ' editando ' + this.details!.endDate);
  }
}
