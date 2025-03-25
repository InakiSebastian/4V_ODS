import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIniciativeViewComponent } from './add-iniciative-view.component';

describe('AddIniciativeViewComponent', () => {
  let component: AddIniciativeViewComponent;
  let fixture: ComponentFixture<AddIniciativeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIniciativeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIniciativeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
