import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalEntitiesPageComponent } from './external-entities-page.component';

describe('ExternalEntitiesPageComponent', () => {
  let component: ExternalEntitiesPageComponent;
  let fixture: ComponentFixture<ExternalEntitiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalEntitiesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalEntitiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
