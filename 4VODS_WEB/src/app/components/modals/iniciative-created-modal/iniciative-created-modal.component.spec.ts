import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativeCreatedModalComponent } from './iniciative-created-modal.component';

describe('IniciativeCreatedModalComponent', () => {
  let component: IniciativeCreatedModalComponent;
  let fixture: ComponentFixture<IniciativeCreatedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativeCreatedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativeCreatedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
