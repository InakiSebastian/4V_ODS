import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddOdsComponent } from './form-add-ods.component';

describe('FormAddOdsComponent', () => {
  let component: FormAddOdsComponent;
  let fixture: ComponentFixture<FormAddOdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddOdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddOdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
