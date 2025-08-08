import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicBalance } from './strategic-balance';

describe('StrategicBalance', () => {
  let component: StrategicBalance;
  let fixture: ComponentFixture<StrategicBalance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicBalance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicBalance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
