import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDifusionComponent } from './form-difusion.component';

describe('FormDifusionComponent', () => {
  let component: FormDifusionComponent;
  let fixture: ComponentFixture<FormDifusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDifusionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDifusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
