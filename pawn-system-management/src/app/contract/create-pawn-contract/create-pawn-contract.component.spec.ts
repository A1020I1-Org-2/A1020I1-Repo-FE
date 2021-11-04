import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePawnContractComponent } from './create-pawn-contract.component';

describe('CreatePawnContractComponent', () => {
  let component: CreatePawnContractComponent;
  let fixture: ComponentFixture<CreatePawnContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePawnContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePawnContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
