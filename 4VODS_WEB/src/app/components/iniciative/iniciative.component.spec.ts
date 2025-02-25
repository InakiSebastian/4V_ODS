import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativeComponent } from './iniciative.component';

describe('IniciativeComponent', () => {
  let component: IniciativeComponent;
  let fixture: ComponentFixture<IniciativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
