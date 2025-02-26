import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgualdadGeneroIconComponent } from './igualdad-genero-icon.component';

describe('IgualdadGeneroIconComponent', () => {
  let component: IgualdadGeneroIconComponent;
  let fixture: ComponentFixture<IgualdadGeneroIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IgualdadGeneroIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgualdadGeneroIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
