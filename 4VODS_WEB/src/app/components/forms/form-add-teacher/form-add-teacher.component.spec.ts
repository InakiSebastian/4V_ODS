import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddTeacherComponent } from './form-add-teacher.component';

describe('FormAddTeacherComponent', () => {
  let component: FormAddTeacherComponent;
  let fixture: ComponentFixture<FormAddTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
