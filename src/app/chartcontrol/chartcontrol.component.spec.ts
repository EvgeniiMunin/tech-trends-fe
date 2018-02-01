import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartcontrolComponent } from './chartcontrol.component';

describe('ChartcontrolComponent', () => {
  let component: ChartcontrolComponent;
  let fixture: ComponentFixture<ChartcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
