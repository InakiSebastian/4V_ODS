import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadSostenibleIconComponent } from './ciudad-sostenible-icon.component';

describe('CiudadSostenibleIconComponent', () => {
  let component: CiudadSostenibleIconComponent;
  let fixture: ComponentFixture<CiudadSostenibleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadSostenibleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadSostenibleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
