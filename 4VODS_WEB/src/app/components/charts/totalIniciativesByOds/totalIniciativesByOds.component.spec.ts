/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TotalIniciativesByOdsComponent } from './totalIniciativesByOds.component';

describe('TotalIniciativesByOdsComponent', () => {
  let component: TotalIniciativesByOdsComponent;
  let fixture: ComponentFixture<TotalIniciativesByOdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalIniciativesByOdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIniciativesByOdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
