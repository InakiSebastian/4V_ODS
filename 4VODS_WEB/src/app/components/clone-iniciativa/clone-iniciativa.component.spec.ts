import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneIniciativaComponent } from './clone-iniciativa.component';

describe('CloneIniciativaComponent', () => {
  let component: CloneIniciativaComponent;
  let fixture: ComponentFixture<CloneIniciativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloneIniciativaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloneIniciativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
