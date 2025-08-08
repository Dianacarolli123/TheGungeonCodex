import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropsDetail } from './drops-detail';

describe('DropsDetail', () => {
  let component: DropsDetail;
  let fixture: ComponentFixture<DropsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropsDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
