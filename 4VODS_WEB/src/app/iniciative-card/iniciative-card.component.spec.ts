import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativeCardComponent } from './iniciative-card.component';

describe('IniciativeCardComponent', () => {
  let component: IniciativeCardComponent;
  let fixture: ComponentFixture<IniciativeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
