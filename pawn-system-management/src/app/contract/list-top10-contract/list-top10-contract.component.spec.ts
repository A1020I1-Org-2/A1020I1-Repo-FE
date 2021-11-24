import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTop10ContractComponent } from './list-top10-contract.component';

describe('ListTop10ContractComponent', () => {
  let component: ListTop10ContractComponent;
  let fixture: ComponentFixture<ListTop10ContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTop10ContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTop10ContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
