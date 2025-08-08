import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gungeoneers } from './gungeoneers';

describe('Gungeoneers', () => {
  let component: Gungeoneers;
  let fixture: ComponentFixture<Gungeoneers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gungeoneers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gungeoneers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
