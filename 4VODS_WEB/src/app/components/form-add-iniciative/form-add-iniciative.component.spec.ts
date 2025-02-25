import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddIniciativeComponent } from './form-add-iniciative.component';

describe('FormAddIniciativeComponent', () => {
  let component: FormAddIniciativeComponent;
  let fixture: ComponentFixture<FormAddIniciativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddIniciativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddIniciativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
