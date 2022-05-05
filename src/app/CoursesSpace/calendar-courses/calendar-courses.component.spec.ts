import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCoursesComponent } from './calendar-courses.component';

describe('CalendarCoursesComponent', () => {
  let component: CalendarCoursesComponent;
  let fixture: ComponentFixture<CalendarCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
