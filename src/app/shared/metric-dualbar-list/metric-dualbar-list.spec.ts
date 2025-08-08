import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGungeoneers } from './metric-dualbar-list';

describe('RankingGungeoneers', () => {
  let component: RankingGungeoneers;
  let fixture: ComponentFixture<RankingGungeoneers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGungeoneers],
    }).compileComponents();

    fixture = TestBed.createComponent(RankingGungeoneers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
