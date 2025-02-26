import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PazJusticiaIconComponent } from './paz-justicia-icon.component';

describe('PazJusticiaIconComponent', () => {
  let component: PazJusticiaIconComponent;
  let fixture: ComponentFixture<PazJusticiaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PazJusticiaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PazJusticiaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
