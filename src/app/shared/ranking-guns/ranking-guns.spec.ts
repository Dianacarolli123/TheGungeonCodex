import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGuns } from './ranking-guns';

describe('RankingGuns', () => {
  let component: RankingGuns;
  let fixture: ComponentFixture<RankingGuns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGuns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingGuns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
