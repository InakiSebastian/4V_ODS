/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HoursBySchoolYearComponent } from './hoursBySchoolYear.component';

describe('HoursBySchoolYearComponent', () => {
  let component: HoursBySchoolYearComponent;
  let fixture: ComponentFixture<HoursBySchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursBySchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursBySchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
