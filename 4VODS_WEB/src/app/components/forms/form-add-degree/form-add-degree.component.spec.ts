import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddDegreeComponent } from './form-add-degree.component';

describe('FormAddDegreeComponent', () => {
  let component: FormAddDegreeComponent;
  let fixture: ComponentFixture<FormAddDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddDegreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
