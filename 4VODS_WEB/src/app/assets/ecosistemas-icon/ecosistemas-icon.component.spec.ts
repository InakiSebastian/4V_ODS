import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosistemasIconComponent } from './ecosistemas-icon.component';

describe('EcosistemasIconComponent', () => {
  let component: EcosistemasIconComponent;
  let fixture: ComponentFixture<EcosistemasIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosistemasIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcosistemasIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
