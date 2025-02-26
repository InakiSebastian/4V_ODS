import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludBienestarIconComponent } from './salud-bienestar-icon.component';

describe('SaludBienestarIconComponent', () => {
  let component: SaludBienestarIconComponent;
  let fixture: ComponentFixture<SaludBienestarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaludBienestarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaludBienestarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
