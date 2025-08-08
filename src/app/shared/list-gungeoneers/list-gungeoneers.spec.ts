import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGungeoneers } from './list-gungeoneers';

describe('ListGungeoneers', () => {
  let component: ListGungeoneers;
  let fixture: ComponentFixture<ListGungeoneers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGungeoneers],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGungeoneers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
