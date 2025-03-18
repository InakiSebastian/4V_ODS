import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOdsComponent } from './form-ods.component';

describe('FormOdsComponent', () => {
  let component: FormOdsComponent;
  let fixture: ComponentFixture<FormOdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOdsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
