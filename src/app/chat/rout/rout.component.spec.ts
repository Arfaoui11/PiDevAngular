import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutComponent } from './rout.component';

describe('RoutComponent', () => {
  let component: RoutComponent;
  let fixture: ComponentFixture<RoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
