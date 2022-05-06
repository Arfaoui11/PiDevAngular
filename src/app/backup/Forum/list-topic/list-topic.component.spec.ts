import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTopicComponent } from './list-topic.component';

describe('ListTopicComponent', () => {
  let component: ListTopicComponent;
  let fixture: ComponentFixture<ListTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
