import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriaIconComponent } from './industria-icon.component';

describe('IndustriaIconComponent', () => {
  let component: IndustriaIconComponent;
  let fixture: ComponentFixture<IndustriaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustriaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustriaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
