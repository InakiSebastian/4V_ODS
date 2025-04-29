/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalIniciativesByDegreeComponent } from './totalIniciativesByDegree.component';

describe('TotalIniciativesByDegreeComponent', () => {
  let component: TotalIniciativesByDegreeComponent;
  let fixture: ComponentFixture<TotalIniciativesByDegreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalIniciativesByDegreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIniciativesByDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
