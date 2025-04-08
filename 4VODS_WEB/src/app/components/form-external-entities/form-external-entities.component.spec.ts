import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExternalEntitiesComponent } from './form-external-entities.component';

describe('FormExternalEntitiesComponent', () => {
  let component: FormExternalEntitiesComponent;
  let fixture: ComponentFixture<FormExternalEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormExternalEntitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExternalEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
