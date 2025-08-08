import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Guns } from './guns';

describe('Guns', () => {
  let component: Guns;
  let fixture: ComponentFixture<Guns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Guns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Guns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
