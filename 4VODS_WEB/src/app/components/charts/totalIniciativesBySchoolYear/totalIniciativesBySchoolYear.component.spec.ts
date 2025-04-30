/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalIniciativesBySchoolYearComponent } from './totalIniciativesBySchoolYear.component';

describe('TotalIniciativesBySchoolYearComponent', () => {
  let component: TotalIniciativesBySchoolYearComponent;
  let fixture: ComponentFixture<TotalIniciativesBySchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalIniciativesBySchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIniciativesBySchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
