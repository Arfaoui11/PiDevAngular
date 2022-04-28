import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfelioFormComponent } from './portfelio-form.component';

describe('PortfelioFormComponent', () => {
  let component: PortfelioFormComponent;
  let fixture: ComponentFixture<PortfelioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfelioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfelioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
