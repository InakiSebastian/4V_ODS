import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinPobrezaIconComponent } from './fin-pobreza-icon.component';

describe('FinPobrezaIconComponent', () => {
  let component: FinPobrezaIconComponent;
  let fixture: ComponentFixture<FinPobrezaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinPobrezaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinPobrezaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
