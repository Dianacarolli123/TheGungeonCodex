import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunsDetail } from './guns-detail';

describe('GunsDetail', () => {
  let component: GunsDetail;
  let fixture: ComponentFixture<GunsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GunsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GunsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
