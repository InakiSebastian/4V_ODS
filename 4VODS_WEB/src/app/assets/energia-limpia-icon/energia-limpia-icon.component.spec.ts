import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergiaLimpiaIconComponent } from './energia-limpia-icon.component';

describe('EnergiaLimpiaIconComponent', () => {
  let component: EnergiaLimpiaIconComponent;
  let fixture: ComponentFixture<EnergiaLimpiaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergiaLimpiaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergiaLimpiaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
