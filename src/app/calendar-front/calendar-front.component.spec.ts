import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFrontComponent } from './calendar-front.component';

describe('CalendarFrontComponent', () => {
  let component: CalendarFrontComponent;
  let fixture: ComponentFixture<CalendarFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
