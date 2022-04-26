import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatstreamComponent } from './chatstream.component';

describe('ChatstreamComponent', () => {
  let component: ChatstreamComponent;
  let fixture: ComponentFixture<ChatstreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatstreamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
