import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnPawnComponent } from './return-pawn.component';

describe('ReturnPawnComponent', () => {
  let component: ReturnPawnComponent;
  let fixture: ComponentFixture<ReturnPawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnPawnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnPawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
