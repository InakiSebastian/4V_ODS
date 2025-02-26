import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionResponsableIconComponent } from './produccion-responsable-icon.component';

describe('ProduccionResponsableIconComponent', () => {
  let component: ProduccionResponsableIconComponent;
  let fixture: ComponentFixture<ProduccionResponsableIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduccionResponsableIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionResponsableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
