import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativeDetailComponent } from './iniciative-detail.component';

describe('IniciativeDetailComponent', () => {
  let component: IniciativeDetailComponent;
  let fixture: ComponentFixture<IniciativeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
