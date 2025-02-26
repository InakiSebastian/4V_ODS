import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReduccionDesigualdadIconComponent } from './reduccion-desigualdad-icon.component';

describe('ReduccionDesigualdadIconComponent', () => {
  let component: ReduccionDesigualdadIconComponent;
  let fixture: ComponentFixture<ReduccionDesigualdadIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReduccionDesigualdadIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReduccionDesigualdadIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
