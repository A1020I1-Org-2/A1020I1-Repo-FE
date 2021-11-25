import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfomationEmmployeeComponent } from './edit-infomation-emmployee.component';

describe('EditInfomationEmmployeeComponent', () => {
  let component: EditInfomationEmmployeeComponent;
  let fixture: ComponentFixture<EditInfomationEmmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInfomationEmmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInfomationEmmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
