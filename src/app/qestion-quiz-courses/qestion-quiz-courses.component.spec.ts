import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QestionQuizCoursesComponent } from './qestion-quiz-courses.component';

describe('QestionQuizCoursesComponent', () => {
  let component: QestionQuizCoursesComponent;
  let fixture: ComponentFixture<QestionQuizCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QestionQuizCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QestionQuizCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
