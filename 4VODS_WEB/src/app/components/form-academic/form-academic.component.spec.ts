import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcademicComponent } from './form-academic.component';

describe('FormAcademicComponent', () => {
  let component: FormAcademicComponent;
  let fixture: ComponentFixture<FormAcademicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAcademicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
