import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddExternalComponent } from './form-add-external.component';

describe('FormAddExternalComponent', () => {
  let component: FormAddExternalComponent;
  let fixture: ComponentFixture<FormAddExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddExternalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
