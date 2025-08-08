import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GungeoneerDetail } from './gungeoneer-detail';

describe('GungeoneerDetail', () => {
  let component: GungeoneerDetail;
  let fixture: ComponentFixture<GungeoneerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GungeoneerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GungeoneerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
