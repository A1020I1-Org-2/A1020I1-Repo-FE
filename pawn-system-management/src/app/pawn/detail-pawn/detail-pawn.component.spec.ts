import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPawnComponent } from './detail-pawn.component';

describe('DetailPawnComponent', () => {
  let component: DetailPawnComponent;
  let fixture: ComponentFixture<DetailPawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPawnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
