import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddGoalComponent } from './form-add-goal.component';

describe('FormAddGoalComponent', () => {
  let component: FormAddGoalComponent;
  let fixture: ComponentFixture<FormAddGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
