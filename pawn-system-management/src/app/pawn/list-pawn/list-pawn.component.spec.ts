import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPawnComponent } from './list-pawn.component';

describe('ListPawnComponent', () => {
  let component: ListPawnComponent;
  let fixture: ComponentFixture<ListPawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPawnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
