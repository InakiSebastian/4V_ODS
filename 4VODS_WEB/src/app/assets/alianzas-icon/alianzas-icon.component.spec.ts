import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlianzasIconComponent } from './alianzas-icon.component';

describe('AlianzasIconComponent', () => {
  let component: AlianzasIconComponent;
  let fixture: ComponentFixture<AlianzasIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlianzasIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlianzasIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
