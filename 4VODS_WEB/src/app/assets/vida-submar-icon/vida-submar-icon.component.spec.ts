import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidaSubmarIconComponent } from './vida-submar-icon.component';

describe('VidaSubmarIconComponent', () => {
  let component: VidaSubmarIconComponent;
  let fixture: ComponentFixture<VidaSubmarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VidaSubmarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VidaSubmarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
