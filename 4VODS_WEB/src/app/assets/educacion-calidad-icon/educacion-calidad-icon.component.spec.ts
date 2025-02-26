import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducacionCalidadIconComponent } from './educacion-calidad-icon.component';

describe('EducacionCalidadIconComponent', () => {
  let component: EducacionCalidadIconComponent;
  let fixture: ComponentFixture<EducacionCalidadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducacionCalidadIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducacionCalidadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
