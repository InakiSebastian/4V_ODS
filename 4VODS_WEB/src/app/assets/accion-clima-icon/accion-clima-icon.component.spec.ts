import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionClimaIconComponent } from './accion-clima-icon.component';

describe('AccionClimaIconComponent', () => {
  let component: AccionClimaIconComponent;
  let fixture: ComponentFixture<AccionClimaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionClimaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionClimaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
