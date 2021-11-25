import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiquidationContractComponentComponent } from './create-liquidation-contract-component.component';

describe('CreateLiquidationContractComponentComponent', () => {
  let component: CreateLiquidationContractComponentComponent;
  let fixture: ComponentFixture<CreateLiquidationContractComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLiquidationContractComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiquidationContractComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
