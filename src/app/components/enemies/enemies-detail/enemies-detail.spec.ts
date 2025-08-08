import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesDetail } from './enemies-detail';

describe('EnemiesDetail', () => {
  let component: EnemiesDetail;
  let fixture: ComponentFixture<EnemiesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemiesDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
