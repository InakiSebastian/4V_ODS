import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciativeListComponent } from './iniciative-list.component';

describe('IniciativeListComponent', () => {
  let component: IniciativeListComponent;
  let fixture: ComponentFixture<IniciativeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciativeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
