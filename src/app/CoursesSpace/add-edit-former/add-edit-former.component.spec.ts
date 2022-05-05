import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormerComponent } from './add-edit-former.component';

describe('AddEditFormerComponent', () => {
  let component: AddEditFormerComponent;
  let fixture: ComponentFixture<AddEditFormerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFormerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFormerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
