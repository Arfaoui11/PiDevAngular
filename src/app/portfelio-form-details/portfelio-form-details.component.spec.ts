import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfelioFormDetailsComponent } from './portfelio-form-details.component';

describe('PortfelioFormDetailsComponent', () => {
  let component: PortfelioFormDetailsComponent;
  let fixture: ComponentFixture<PortfelioFormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfelioFormDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfelioFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
