import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialOverview } from './initial-overview';

describe('InitialOverview', () => {
  let component: InitialOverview;
  let fixture: ComponentFixture<InitialOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
