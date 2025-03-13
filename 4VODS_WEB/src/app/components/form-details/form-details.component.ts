import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IDetails } from '../form-add-iniciative/interfaces/details.interface';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-form-details',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.scss'
})
export class FormDetailsComponent {

  @Input() details: IDetails | null = null;

  constructor() { }

  ngOnInit() {
    
  }
}
