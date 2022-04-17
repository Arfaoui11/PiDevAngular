import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplaylistComponent } from './videoplaylist.component';

describe('VideoplaylistComponent', () => {
  let component: VideoplaylistComponent;
  let fixture: ComponentFixture<VideoplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoplaylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
