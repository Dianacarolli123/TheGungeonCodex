import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSections } from './btn-sections';

describe('BtnSections', () => {
  let component: BtnSections;
  let fixture: ComponentFixture<BtnSections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnSections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnSections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
