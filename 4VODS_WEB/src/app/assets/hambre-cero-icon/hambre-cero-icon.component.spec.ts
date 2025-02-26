import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HambreCeroIconComponent } from './hambre-cero-icon.component';

describe('HambreCeroIconComponent', () => {
  let component: HambreCeroIconComponent;
  let fixture: ComponentFixture<HambreCeroIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HambreCeroIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HambreCeroIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
