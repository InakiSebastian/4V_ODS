import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguaLimpiaIconComponent } from './agua-limpia-icon.component';

describe('AguaLimpiaIconComponent', () => {
  let component: AguaLimpiaIconComponent;
  let fixture: ComponentFixture<AguaLimpiaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguaLimpiaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AguaLimpiaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
