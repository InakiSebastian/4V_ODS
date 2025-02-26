import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoCrecimientoIconComponent } from './trabajo-crecimiento-icon.component';

describe('TrabajoCrecimientoIconComponent', () => {
  let component: TrabajoCrecimientoIconComponent;
  let fixture: ComponentFixture<TrabajoCrecimientoIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajoCrecimientoIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajoCrecimientoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
