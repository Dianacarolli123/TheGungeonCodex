import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedItems } from './recommended-items';

describe('RecommendedItems', () => {
  let component: RecommendedItems;
  let fixture: ComponentFixture<RecommendedItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
